/**
 * data/ai-engineer/mcp.js — Phase 4: Model Context Protocol
 */
export default {
  id: 'ai-engineer-mcp',
  subject: 'ai-engineer',
  title: 'Phase 4: Model Context Protocol',
  
  difficulty: 'hard',
  estimatedTime: 85,
  prerequisites: ['langgraph'],

  notes: `
## Phase 4: Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open standard introduced by Anthropic that defines how LLM applications connect to external context, resources, and tools. Instead of custom API wrappers for every database or service, MCP provides a unified client-server interface.

---

### 1. MCP Core & Architecture

#### How it works:
*   **Protocol:** Uses JSON-RPC 2.0 to send structured requests and responses between the client and server.
*   **Transports:**
    *   **Stdio:** Standard input/output communication for local servers (very fast, low overhead).
    *   **SSE (Server-Sent Events):** HTTP-based transport for remote servers, using POST requests to trigger actions.
*   **Topology:**
    \\\`\\\`\\\`
    [ LLM / Agent ] ──> [ MCP Client ] ──(JSON-RPC over Stdio/SSE)──> [ MCP Server ] ──> [ Files / DB / API / Tools ]
    \\\`\\\`\\\`

---

### 2. Integration & FastMCP

*   **FastMCP:** A high-level SDK (available in Python and TypeScript) to create MCP servers rapidly.
*   **MCP Clients:** Major applications (like Claude Desktop, Cursor, LangGraph) can connect to any compliant MCP server to gain native tool capabilities.
*   **Built-in Server Types:**
    *   **SQLite / PostgreSQL MCP:** Exposes SQL query tools to the LLM agent.
    *   **Filesystem MCP:** Exposes file read, write, and list tools.
    *   **API MCP:** Exposes HTTP endpoints of tools like Slack, Notion, GitHub, and Google Drive.

---

### 3. MCP Security & Sandboxing

Allowing LLMs to execute commands or read files poses severe risks:
*   **Authentication & Authorization:** Restricting which tokens or users can access specific MCP servers.
*   **Tool Sandboxing:** Running local MCP servers inside secure docker containers or isolated runtimes to prevent rogue shell commands (e.g. \\\`rm -rf /\\\`).
*   **Permission Scopes:** Restricting an MCP tool to read-only scopes or specific sub-directories.

---

### 4. Build: SQLite FastMCP Server
Here is how to build and launch a custom tool server using the Python FastMCP SDK:

\\\`\\\`\\\`python
# Install: pip install mcp
from mcp.server.fastmcp import FastMCP
import sqlite3

# Create an MCP Server
mcp = FastMCP("SQLite Manager")

@mcp.tool()
def query_local_db(sql: str) -> str:
    """Execute a read-only SQL query against the local SQLite database."""
    # Strict validation: prevent write operations
    sql_lower = sql.lower().strip()
    if not sql_lower.startswith("select"):
        return "Error: Only SELECT queries are permitted for safety reasons."
    
    conn = sqlite3.connect("data.db")
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
        return str(rows)
    except Exception as e:
        return f"Error executing query: {str(e)}"
    finally:
        conn.close()

if __name__ == "__main__":
    mcp.run() # Defaults to STDIO transport
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'JSON-RPC Payload Structure', formula: '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "tool_name", "arguments": {...}}, "id": 1}', example: 'Standard message schema between client and server' },
    { name: 'Sandbox Rule of Thumb',        formula: 'Scope = Least Privilege', example: 'Limit filesystem tools to subdirectory access' }
  ],

  shortcuts: [
    'Use Stdio transport for local dev, desktop clients, and single-machine agents.',
    'Use SSE (Server-Sent Events) transport for web-scale multi-user SaaS deployments.',
    'Always parse and block non-SELECT keywords when exposing database tools to models.'
  ],

  questions: [
    {
      id: 'mcp-q1',
      text: 'What protocol is used by the Model Context Protocol (MCP) to format messages between clients and servers?',
      options: ['gRPC', 'JSON-RPC 2.0', 'WebSockets protocol', 'GraphQL'],
      answer: 1,
      explanation: 'MCP uses the JSON-RPC 2.0 standard for structured, asynchronous remote procedure calls between the client (agent) and server (tools).',
      hint: 'It is a lightweight JSON-based RPC standard.',
      difficulty: 'easy',
      tags: ['mcp', 'protocol'],
      timeLimit: 45
    },
    {
      id: 'mcp-q2',
      text: 'Which transport is most suitable for a cloud-deployed multi-user web application calling remote MCP tools?',
      options: ['Stdio', 'WebRTC', 'Server-Sent Events (SSE)', 'Shared Memory'],
      answer: 2,
      explanation: 'SSE (Server-Sent Events) is the HTTP-based transport standard defined by MCP for client-server communication over networks and web services.',
      hint: 'Stdio is for local terminal processes; this is for HTTP communication.',
      difficulty: 'medium',
      tags: ['transports'],
      timeLimit: 60
    },
    {
      id: 'mcp-q3',
      text: 'What is the function of the FastMCP SDK?',
      options: [
        'To accelerate LLM matrix multiplications on GPUs',
        'To easily write and host custom tool servers with automatic schema generation using decorators',
        'To compile Cypher queries to PostgreSQL queries',
        'To establish encrypted VPN connections between agent clients'
      ],
      answer: 1,
      explanation: 'FastMCP is a developer-friendly SDK designed to write MCP servers in Python or TypeScript with minimal boilerplates, exposing Python functions as tools automatically.',
      hint: 'It uses decorators (like @mcp.tool()) to convert functions to JSON-RPC tools.',
      difficulty: 'easy',
      tags: ['fastmcp', 'sdk'],
      timeLimit: 45
    },
    {
      id: 'mcp-q4',
      text: 'Why is Tool Sandboxing critical when exposing tool executions (like a Python REPL or filesystem tools) to an LLM?',
      options: [
        'It increases LLM context window size',
        'It prevents an LLM from generating invalid syntax',
        'It isolates tool execution environments to prevent rogue or destructive shell commands from compromising the host system',
        'It reduces token usage of tool arguments'
      ],
      answer: 2,
      explanation: 'LLMs can generate arbitrary code or CLI arguments. Sandboxing ensures that code or files are executed within a confined container (like Docker), protecting the main host.',
      hint: 'Isolation prevents malicious or accidental system destruction.',
      difficulty: 'medium',
      tags: ['security', 'sandboxing'],
      timeLimit: 60
    },
    {
      id: 'mcp-q5',
      text: 'Which of the following is a valid method of integrating MCP servers with a custom LangGraph agent?',
      options: [
        'Re-compiling the LLM base weights',
        'Using an MCP Client adapter to connect to the server, fetch tool schemas, and convert them to LangGraph Tool objects',
        'Directly uploading the sqlite database file to the OpenAI API',
        'Translating all JSON-RPC calls to SQL queries in memory'
      ],
      answer: 1,
      explanation: 'LangGraph uses adapters to connect to MCP servers. The client queries the server\'s /tools/list endpoint, wraps them as LangGraph tools, and passes them to the LLM.',
      hint: 'Adapters translate the MCP tool interface to LangGraph\'s expected Tool structure.',
      difficulty: 'hard',
      tags: ['langgraph', 'mcp'],
      timeLimit: 75
    }
  ],

  aiTutorPrompt: 'You are an MCP Protocols Engineer tutoring a student on Phase 4: Model Context Protocol. Detail the client-server architecture, JSON-RPC 2.0 payloads, Stdio vs SSE transport, FastMCP, and crucial security measures like Docker sandboxing.'
};
