#!/usr/bin/env python3
import os
import sys
import hashlib
import subprocess
import re
import shutil

# python-docx and fpdf2 imports for native conversion
from docx import Document
from docx.document import Document as DocClass
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph
from fpdf import FPDF

# Paths
WORKSPACE_DIR = "/home/gaurav/Downloads/Placement/Tcs"
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "converted_images")
TEMP_DIR = os.path.join(WORKSPACE_DIR, "temp_pdfs")
OUTPUT_PDF = os.path.join(WORKSPACE_DIR, "combined_all_documents.pdf")

# ANSI Colors for premium logs
GREEN = "\033[92m"
BLUE = "\033[94m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
RESET = "\033[0m"

def log_info(msg):
    print(f"{BLUE}[INFO]{RESET} {msg}")

def log_success(msg):
    print(f"{GREEN}[SUCCESS]{RESET} {msg}")

def log_warn(msg):
    print(f"{YELLOW}[WARNING]{RESET} {msg}")

def log_error(msg):
    print(f"{RED}[ERROR]{RESET} {msg}")

def get_md5(file_path):
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def find_files():
    pdf_files = []
    docx_files = []
    
    # We will walk through the directory but ignore output/temp directories
    for root, dirs, files in os.walk(WORKSPACE_DIR):
        # Skip output/temp folders to avoid self-processing
        dirs[:] = [d for d in dirs if d not in ["converted_images", "temp_pdfs", "venv", ".git", ".gemini"]]
        
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.abspath(file_path) == os.path.abspath(OUTPUT_PDF):
                continue
            ext = os.path.splitext(file)[1].lower()
            if ext == ".pdf":
                pdf_files.append(file_path)
            elif ext == ".docx":
                docx_files.append(file_path)
                
    return pdf_files, docx_files

def deduplicate_files(file_paths):
    seen_hashes = {}
    unique_files = []
    duplicates = []
    
    for path in file_paths:
        try:
            file_hash = get_md5(path)
            if file_hash in seen_hashes:
                duplicates.append((path, seen_hashes[file_hash]))
            else:
                seen_hashes[file_hash] = path
                unique_files.append(path)
        except Exception as e:
            log_error(f"Failed to hash {path}: {e}")
            unique_files.append(path) # Fallback to keeping it
            
    return unique_files, duplicates

def iter_block_items(parent):
    if isinstance(parent, DocClass):
        parent_elm = parent.element.body
    elif isinstance(parent, _Cell):
        parent_elm = parent._tc
    else:
        raise TypeError("Could not iterate block items")

    for child in parent_elm.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, parent)
        elif isinstance(child, CT_Tbl):
            yield Table(child, parent)

def clean_text(text):
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    text = text.replace('\u2022', '* ')
    text = text.replace('\uff08', '(').replace('\uff09', ')')
    text = text.replace('\u2212', '-')
    return text.encode('latin-1', 'replace').decode('latin-1')

def convert_docx_to_pdf_native(docx_path, pdf_path):
    try:
        doc = Document(docx_path)
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("helvetica", size=11)
        pdf.set_auto_page_break(auto=True, margin=15)
        
        # Title
        pdf.set_font("helvetica", style="B", size=14)
        filename = os.path.basename(docx_path)
        pdf.multi_cell(0, 8, text=clean_text(os.path.splitext(filename)[0]))
        pdf.ln(5)
        pdf.set_font("helvetica", size=11)
        
        for block in iter_block_items(doc):
            if isinstance(block, Paragraph):
                text = block.text.strip()
                if not text:
                    pdf.ln(4)
                    continue
                pdf.multi_cell(0, 6, text=clean_text(text))
                pdf.ln(3)
            elif isinstance(block, Table):
                pdf.ln(2)
                for r_idx, row in enumerate(block.rows):
                    row_cells = []
                    for cell in row.cells:
                        cell_text = cell.text.strip()
                        if cell_text:
                            row_cells.append(cell_text)
                    if row_cells:
                        line = "  |  ".join(row_cells)
                        pdf.set_font("helvetica", style="I", size=10)
                        pdf.multi_cell(0, 5, text=clean_text(f"Row {r_idx+1}: {line}"))
                        pdf.set_font("helvetica", size=11)
                        pdf.ln(1)
                pdf.ln(3)
                
        pdf.output(pdf_path)
        return True
    except Exception as e:
        log_error(f"Failed converting {os.path.basename(docx_path)} natives: {e}")
        return False

def convert_docx_files(docx_paths, output_dir):
    converted_pdfs = []
    if not docx_paths:
        return converted_pdfs
        
    os.makedirs(output_dir, exist_ok=True)
    log_info(f"Converting {len(docx_paths)} DOCX files to PDF using native python-docx...")
    
    for i, docx_path in enumerate(docx_paths, 1):
        filename = os.path.basename(docx_path)
        pdf_name = os.path.splitext(filename)[0] + ".pdf"
        target_pdf_path = os.path.join(output_dir, pdf_name)
        
        # Check if already converted
        if os.path.exists(target_pdf_path):
            log_info(f"[{i}/{len(docx_paths)}] {filename} already converted.")
            converted_pdfs.append(target_pdf_path)
            continue
            
        log_info(f"[{i}/{len(docx_paths)}] Converting {filename}...")
        if convert_docx_to_pdf_native(docx_path, target_pdf_path):
            converted_pdfs.append(target_pdf_path)
            
    return converted_pdfs

def convert_pdf_to_images(pdf_paths, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    log_info(f"Converting {len(pdf_paths)} PDF files to JPEG images...")
    
    for i, pdf_path in enumerate(pdf_paths, 1):
        filename = os.path.basename(pdf_path)
        doc_name = os.path.splitext(filename)[0]
        # Clean folder name for images
        folder_name = "".join([c if c.isalnum() or c in " ._-" else "_" for c in doc_name]).strip()
        pdf_image_dir = os.path.join(output_dir, folder_name)
        
        # Check if already processed
        if os.path.exists(pdf_image_dir) and os.listdir(pdf_image_dir):
            log_info(f"[{i}/{len(pdf_paths)}] Images for {filename} already exist.")
            continue
            
        os.makedirs(pdf_image_dir, exist_ok=True)
        log_info(f"[{i}/{len(pdf_paths)}] Converting {filename} to images...")
        try:
            prefix = os.path.join(pdf_image_dir, "page")
            cmd = ["pdftoppm", "-jpeg", "-r", "150", pdf_path, prefix]
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                pages_count = len(os.listdir(pdf_image_dir))
                log_success(f"  -> Generated {pages_count} images for {filename}")
            else:
                stderr_str = result.stderr.decode('utf-8', errors='replace')
                log_error(f"Failed to convert {filename} to images: {stderr_str}")
        except Exception as e:
            log_error(f"Error converting {filename} to images: {e}")

def merge_pdfs(pdf_paths, output_path):
    if not pdf_paths:
        log_warn("No PDF files to merge.")
        return False
        
    log_info(f"Merging {len(pdf_paths)} PDF files into a single PDF: {os.path.basename(output_path)}...")
    
    # Sort files naturally by filename to maintain a logical order
    pdf_paths.sort(key=lambda p: natural_sort_key(os.path.basename(p)))
    
    # Try pdfunite first
    try:
        cmd = ["pdfunite"] + pdf_paths + [output_path]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0 and os.path.exists(output_path):
            log_success(f"Merged PDF successfully created at: {output_path}")
            return True
        else:
            stderr_str = result.stderr.decode('utf-8', errors='replace')
            log_warn(f"pdfunite failed (possibly due to encryption): {stderr_str.strip()}. Trying Ghostscript fallback...")
            
            # Fallback to gs
            gs_cmd = [
                "gs", "-dNOPAUSE", "-sDEVICE=pdfwrite", 
                f"-sOUTPUTFILE={output_path}", "-dBATCH"
            ] + pdf_paths
            gs_result = subprocess.run(gs_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if gs_result.returncode == 0 and os.path.exists(output_path):
                log_success(f"Merged PDF successfully created with Ghostscript fallback at: {output_path}")
                return True
            else:
                gs_stderr = gs_result.stderr.decode('utf-8', errors='replace')
                log_error(f"Ghostscript also failed: {gs_stderr.strip()}")
                return False
    except Exception as e:
        log_error(f"Error merging PDFs: {e}")
        return False

def main():
    print(f"{BOLD}{BLUE}=================================================={RESET}")
    print(f"{BOLD}{BLUE}    TCS Placement Papers Native Python Processor  {RESET}")
    print(f"{BOLD}{BLUE}=================================================={RESET}")
    
    # 1. Discover all files
    log_info("Scanning directory for PDF and DOCX files...")
    pdf_files, docx_files = find_files()
    log_info(f"Found {len(pdf_files)} PDF files and {len(docx_files)} DOCX files.")
    
    # 2. Deduplicate files
    log_info("Deduplicating files by MD5 checksum...")
    unique_pdfs, dup_pdfs = deduplicate_files(pdf_files)
    unique_docx, dup_docx = deduplicate_files(docx_files)
    
    log_info(f"Unique PDFs: {len(unique_pdfs)} (skipped {len(dup_pdfs)} duplicates)")
    log_info(f"Unique DOCXs: {len(unique_docx)} (skipped {len(dup_docx)} duplicates)")
    
    # 3. Convert DOCX to PDF
    converted_pdfs = convert_docx_files(unique_docx, TEMP_DIR)
    
    # 4. Convert all unique PDFs (original + converted DOCXs) to images
    all_pdfs_to_image = unique_pdfs + converted_pdfs
    convert_pdf_to_images(all_pdfs_to_image, IMAGES_DIR)
    
    # 5. Merge all unique PDFs into one single PDF
    all_pdfs_to_merge = unique_pdfs + converted_pdfs
    merge_success = merge_pdfs(all_pdfs_to_merge, OUTPUT_PDF)
    
    # 6. Cleanup temp directory
    if os.path.exists(TEMP_DIR):
        log_info("Cleaning up temporary PDF conversions...")
        shutil.rmtree(TEMP_DIR)
        
    print(f"{BOLD}{BLUE}=================================================={RESET}")
    if merge_success:
        log_success(f"Processing complete!")
        log_success(f"Combined PDF: {OUTPUT_PDF}")
        log_success(f"Images folder: {IMAGES_DIR}")
    else:
        log_warn("Processing finished with some errors during PDF merging.")
        log_success(f"Images folder: {IMAGES_DIR}")
    print(f"{BOLD}{BLUE}=================================================={RESET}")

if __name__ == "__main__":
    main()
