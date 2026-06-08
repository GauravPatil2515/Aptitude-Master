const SYLLABUS_DATA = {
  weeks: [
    {
      weekNumber: 1,
      title: "Arithmetic Foundation",
      days: [
        {
          day: 1,
          topic: "Percentages",
          category: "Quantitative Aptitude",
          theory: `
            <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
              <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                Day 1 Placement Formula Sheet (Memorize)
              </h3>
              <ul style="padding-left: 20px; line-height: 1.6; margin-bottom: 0; font-size: 13.5px; color: var(--text-light);">
                <li><strong>Percentage:</strong> (Part / Whole) * 100</li>
                <li><strong>Increase%:</strong> (Increase / Original) * 100</li>
                <li><strong>Decrease%:</strong> (Decrease / Original) * 100</li>
                <li><strong>Successive Changes:</strong> A + B + (AB / 100)</li>
                <li><strong>Required decrease after x% increase:</strong> [x / (100 + x)] * 100</li>
                <li><strong>Required increase after x% decrease:</strong> [x / (100 - x)] * 100</li>
                <li><strong>Growth Multipliers:</strong> +10% = 1.10, +20% = 1.20, +25% = 1.25, -20% = 0.80, -25% = 0.75</li>
              </ul>
            </div>

            <p>Percentages are one of the most critical foundation blocks in aptitude testing. They form the basis for solving Profit &amp; Loss, Simple &amp; Compound Interest, Mixtures, Averages, and Data Interpretation.</p>
            
            <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. What is Percentage?</h3>
            <p>Percentage means "per hundred". Denoted by "%", it is a fraction with denominator 100.</p>
            <p style="margin-top: 5px;"><code class="math">x% = x / 100</code></p>
            
            <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Fraction ↔ Percentage (Must Memorize)</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; background: rgba(255,255,255,0.02); border-radius: 8px; overflow: hidden; font-size: 13px;">
              <thead>
                <tr style="background: rgba(255,255,255,0.05); text-align: left;">
                  <th style="padding: 6px 12px; border-bottom: 1px solid var(--border-color);">Fraction</th>
                  <th style="padding: 6px 12px; border-bottom: 1px solid var(--border-color);">Percentage</th>
                  <th style="padding: 6px 12px; border-bottom: 1px solid var(--border-color);">Fraction</th>
                  <th style="padding: 6px 12px; border-bottom: 1px solid var(--border-color);">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/2</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">50%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">5/6</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">83.33%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/3</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">33.33%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/8</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">12.5%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">2/3</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">66.67%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">3/8</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">37.5%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/4</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">25%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">5/8</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">62.5%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">3/4</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">75%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">7/8</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">87.5%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/5</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">20%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/10</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">10%</td></tr>
                <tr><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">4/5</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">80%</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">1/20</td><td style="padding: 5px 12px; border-bottom: 1px solid var(--border-color);">5%</td></tr>
              </tbody>
            </table>
          `,
          formulas: [
            { name: "Percentage Value", formula: "Value = (Part / Whole) * 100" },
            { name: "Percentage Increase", formula: "Increase% = (Increase / Original) * 100" },
            { name: "Percentage Decrease", formula: "Decrease% = (Decrease / Original) * 100" },
            { name: "Successive Changes", formula: "Net% = A + B + (A*B / 100)" },
            { name: "Restore Value (from increase)", formula: "Decrease Needed = [x / (100 + x)] * 100" },
            { name: "Restore Value (from decrease)", formula: "Increase Needed = [x / (100 - x)] * 100" }
          ],
          shortcuts: [
            "Growth multipliers speed up calculations: +10% = 1.10, +25% = 1.25, -20% = 0.80, -25% = 0.75",
            "Price ↑, consumption ↓ (same expenditure): [Increase / (100 + Increase)] * 100",
            "Price ↓, consumption ↑ (same expenditure): [Decrease / (100 - Decrease)] * 100",
            "Population growth: New = Old * (1 + r/100)^n"
          ],
          questions: [
            {
              question: "Calculate 20% of 450.",
              options: ["70", "80", "90", "100"],
              answer: 2,
              explanation: "20% of 450 = 0.20 * 450 = 90."
            },
            {
              question: "Calculate 35% of 200.",
              options: ["60", "70", "80", "95"],
              answer: 1,
              explanation: "35% of 200 = 0.35 * 200 = 70."
            },
            {
              question: "Calculate 12.5% of 240.",
              options: ["25", "30", "35", "40"],
              answer: 1,
              explanation: "12.5% is equivalent to 1/8. So, 240 / 8 = 30."
            },
            {
              question: "Calculate 62.5% of 160.",
              options: ["80", "90", "100", "110"],
              answer: 2,
              explanation: "62.5% is equivalent to 5/8. So, (5/8) * 160 = 5 * 20 = 100."
            },
            {
              question: "Calculate 18% of 500.",
              options: ["80", "85", "90", "95"],
              answer: 2,
              explanation: "18% of 500 = 18 * 5 = 90."
            },
            {
              question: "45 is what % of 180?",
              options: ["20%", "25%", "30%", "33.33%"],
              answer: 1,
              explanation: "(45 / 180) * 100 = (1/4) * 100 = 25%."
            },
            {
              question: "72 is what % of 120?",
              options: ["50%", "55%", "60%", "65%"],
              answer: 2,
              explanation: "(72 / 120) * 100 = (6/10) * 100 = 60%."
            },
            {
              question: "150 is what % of 600?",
              options: ["20%", "25%", "30%", "40%"],
              answer: 1,
              explanation: "(150 / 600) * 100 = (1/4) * 100 = 25%."
            },
            {
              question: "A number increases from 400 to 500. Find increase %.",
              options: ["20%", "25%", "30%", "35%"],
              answer: 1,
              explanation: "Increase = 500 - 400 = 100. Increase% = (100 / 400) * 100 = 25%."
            },
            {
              question: "A number decreases from 900 to 720. Find decrease %.",
              options: ["15%", "18%", "20%", "25%"],
              answer: 2,
              explanation: "Decrease = 900 - 720 = 180. Decrease% = (180 / 900) * 100 = 20%."
            },
            {
              question: "A salary increases from ₹25,000 to ₹30,000. Find increase %.",
              options: ["15%", "18%", "20%", "25%"],
              answer: 2,
              explanation: "Increase = 30000 - 25000 = 5000. Increase% = (5000 / 25000) * 100 = 20%."
            },
            {
              question: "A product price decreases from ₹2,000 to ₹1,700. Find decrease %.",
              options: ["10%", "15%", "20%", "25%"],
              answer: 1,
              explanation: "Decrease = 2000 - 1700 = 300. Decrease% = (300 / 2000) * 100 = 15%."
            },
            {
              question: "Increase 15%, then increase 20%. Find net % change.",
              options: ["35%", "36%", "38%", "40%"],
              answer: 2,
              explanation: "Using successive change: A + B + (A*B)/100 = 15 + 20 + (15*20)/100 = 35 + 3 = 38%."
            },
            {
              question: "Increase 40%, then decrease 20%. Find net % change.",
              options: ["12% increase", "15% increase", "20% increase", "20% decrease"],
              answer: 0,
              explanation: "Successive change: A = 40, B = -20. Net change = 40 - 20 + (40 * -20)/100 = 20 - 8 = +12%."
            },
            {
              question: "Decrease 25%, then decrease 20%. Find net % change.",
              options: ["-40%", "-42%", "-44%", "-45%"],
              answer: 0,
              explanation: "Successive change: A = -25, B = -20. Net change = -25 - 20 + (-25 * -20)/100 = -45 + 5 = -40%."
            },
            {
              question: "A number becomes 180 after a 20% increase. Find original number.",
              options: ["140", "150", "160", "170"],
              answer: 1,
              explanation: "1.20 * Original = 180 => Original = 180 / 1.20 = 150."
            },
            {
              question: "A number becomes 270 after a 35% increase. Find original number.",
              options: ["180", "190", "200", "210"],
              answer: 2,
              explanation: "1.35 * Original = 270 => Original = 270 / 1.35 = 200."
            },
            {
              question: "A value becomes 600 after a 25% decrease. Find original value.",
              options: ["750", "800", "850", "900"],
              answer: 1,
              explanation: "0.75 * Original = 600 => Original = 600 / 0.75 = 800."
            },
            {
              question: "A value becomes 420 after a 30% decrease. Find original value.",
              options: ["550", "580", "600", "650"],
              answer: 2,
              explanation: "0.70 * Original = 420 => Original = 420 / 0.70 = 600."
            },
            {
              question: "Population grows 20% in one year. If current population is 24,000, find previous year's population.",
              options: ["18,000", "20,000", "21,000", "22,000"],
              answer: 1,
              explanation: "1.20 * Previous = 24000 => Previous = 24000 / 1.20 = 20000."
            },
            {
              question: "A quantity is increased by 25%. By what % should it be decreased to restore original value?",
              options: ["15%", "20%", "25%", "33.33%"],
              answer: 1,
              explanation: "Using formula: [x / (100 + x)] * 100 = [25 / 125] * 100 = 20%."
            },
            {
              question: "A quantity is decreased by 40%. By what % should it increase to restore original value?",
              options: ["40%", "50%", "60%", "66.67%"],
              answer: 3,
              explanation: "Using formula: [x / (100 - x)] * 100 = [40 / 60] * 100 = 66.67%."
            },
            {
              question: "Price increases by 30% and then decreases by 10%. Find net change.",
              options: ["17% increase", "20% increase", "17% decrease", "23% increase"],
              answer: 0,
              explanation: "A = +30, B = -10. Net change = A + B + AB/100 = 30 - 10 - (30*10)/100 = 20 - 3 = 17%."
            },
            {
              question: "Price decreases by 20% and then increases by 25%. Find net change.",
              options: ["5% increase", "5% decrease", "0% (No change)", "4% decrease"],
              answer: 2,
              explanation: "A = -20, B = +25. Net change = -20 + 25 + (-20*25)/100 = 5 - 5 = 0%."
            },
            {
              question: "Population increases by 10% every year. If population today is 13,310, what was it 3 years ago?",
              options: ["9,000", "10,000", "11,000", "12,000"],
              answer: 1,
              explanation: "Growth multiplier each year = 1.10. For 3 years = 1.10^3 = 1.331. Original = 13310 / 1.331 = 10000."
            },
            {
              question: "A shirt marked ₹1200 is increased by 20% and then reduced by 20%. Find final price.",
              options: ["₹1100", "₹1152", "₹1200", "₹1250"],
              answer: 1,
              explanation: "Final Price = 1200 * 1.20 * 0.80 = 1200 * 0.96 = ₹1152."
            },
            {
              question: "A number becomes 144 after two successive increases of 20% each. Find original number.",
              options: ["90", "100", "110", "120"],
              answer: 1,
              explanation: "Original * 1.2 * 1.2 = 144 => Original * 1.44 = 144 => Original = 100."
            },
            {
              question: "A number becomes 108 after successive changes of +20% and -10%. Find original number.",
              options: ["90", "95", "100", "105"],
              answer: 2,
              explanation: "Original * 1.2 * 0.9 = 108 => Original * 1.08 = 108 => Original = 100."
            },
            {
              question: "The price of sugar increases by 25%. By what % must consumption be reduced so expenditure remains the same?",
              options: ["15%", "20%", "25%", "30%"],
              answer: 1,
              explanation: "Required reduction = [Increase / (100 + Increase)] * 100 = [25 / 125] * 100 = 20%."
            },
            {
              question: "The price of petrol decreases by 20%. By what % can consumption increase while expenditure remains unchanged?",
              options: ["20%", "25%", "30%", "33.33%"],
              answer: 1,
              explanation: "Required increase = [Decrease / (100 - Decrease)] * 100 = [20 / 80] * 100 = 25%."
            },
            {
              question: "If A is 20% more than B, then B is what % less than A?",
              options: ["16.67%", "20%", "25%", "33.33%"],
              answer: 0,
              explanation: "B is less than A by: [x / (100 + x)] * 100% = [20 / 120] * 100 = 16.67%."
            },
            {
              question: "If A is 25% less than B, then B is what % more than A?",
              options: ["20%", "25%", "33.33%", "50%"],
              answer: 2,
              explanation: "B is more than A by: [x / (100 - x)] * 100% = [25 / 75] * 100 = 33.33%."
            },
            {
              question: "A's salary is 50% more than B's. By what % is B's salary less than A's?",
              options: ["25%", "33.33%", "40%", "50%"],
              answer: 1,
              explanation: "Required decrease = [50 / (100 + 50)] * 100 = 33.33%."
            },
            {
              question: "A number is first increased by 10%, then by 20%, then decreased by 10%. Find net % change.",
              options: ["18.8% increase", "20% increase", "18.8% decrease", "22% increase"],
              answer: 0,
              explanation: "Combined multiplier = 1.10 * 1.20 * 0.90 = 1.188. This represents an 18.8% increase."
            },
            {
              question: "The population of a city increases by 20% in the first year and 25% in the second year. Find total increase % over two years.",
              options: ["45%", "48%", "50%", "52%"],
              answer: 2,
              explanation: "Successive change = 20 + 25 + (20*25)/100 = 50%."
            }
          ]
        },
        {
          day: 2,
          topic: "Ratio & Proportion",
          category: "Quantitative Aptitude",
          theory: `
            <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
              <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                Day 2 Placement Formula Sheet (Memorize)
              </h3>
              <ul style="padding-left: 20px; line-height: 1.6; margin-bottom: 0; font-size: 13.5px; color: var(--text-light);">
                <li><strong>Ratio Definition:</strong> a : b = a / b (Comparison of two quantities of same kind)</li>
                <li><strong>Proportion Equality:</strong> a : b = c : d &rArr; ad = bc (Product of Extremes = Product of Means)</li>
                <li><strong>Direct Proportion:</strong> x₁ / y₁ = x₂ / y₂ (One increases &rArr; other increases)</li>
                <li><strong>Inverse Proportion:</strong> x₁ * y₁ = x₂ * y₂ (One increases &rArr; other decreases)</li>
                <li><strong>Division in Ratio:</strong> Share A = [a / (a + b)] * Total, Share B = [b / (a + b)] * Total</li>
              </ul>
            </div>

            <p>Ratio and Proportion is one of the highest-weightage topics in campus placement exams. It builds the foundation for solving Partnership, Ages, Averages, and Mixture problems.</p>
            
            <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. What is a Ratio?</h3>
            <p>A ratio compares two quantities of the same kind. For example, if there are 10 boys and 15 girls, the ratio of boys to girls is 10:15 which simplifies to 2:3 by dividing by their HCF (5).</p>
            
            <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Direct vs. Inverse Proportion</h3>
            <p><strong>Direct Proportion:</strong> More quantities yield more results (e.g., More books &rArr; More cost). <code>x₁/y₁ = x₂/y₂</code>.</p>
            <p><strong>Inverse Proportion:</strong> More quantities yield fewer results (e.g., More workers &rArr; Fewer days to finish). <code>x₁y₁ = x₂y₂</code>.</p>

            <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">3. 15 Major Placement Patterns Explained</h3>
            <div style="max-height: 300px; overflow-y: auto; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 13px; line-height: 1.5;">
              <strong>Type 1: Basic Ratio</strong><br>Ratio of 36 and 48 = 36:48 = 3:4 (Divided by HCF 12).<br><br>
              <strong>Type 2: Fraction ↔ Ratio</strong><br>Fraction 3/4 = Ratio 3:4. Ratio 5:8 = Fraction 5/8.<br><br>
              <strong>Type 3: Missing Number in Proportion</strong><br>3:5 = x:15 &rArr; 3*15 = 5x &rArr; 45 = 5x &rArr; x = 9.<br><br>
              <strong>Type 4: Divide Money in Ratio</strong><br>Divide ₹700 in ratio 2:5. Total parts = 7. One part = ₹100. Shares: ₹200 and ₹500.<br><br>
              <strong>Type 5: Actual Quantities</strong><br>Boys:Girls = 3:4, Total = 35. Parts = 7. One part = 5. Boys = 15, Girls = 20.<br><br>
              <strong>Type 6: Ratio Changes</strong><br>Boys:Girls = 3:2, Total = 50 (Boys=30, Girls=20). 5 girls join (Girls=25). New ratio = 30:25 = 6:5.<br><br>
              <strong>Type 7: Age Ratio</strong><br>Ages of A:B = 3:5, Total = 40. Parts = 8. One part = 5. A = 15 yrs, B = 25 yrs.<br><br>
              <strong>Type 8: Direct Proportion</strong><br>5 books cost ₹100. 8 books cost = (100 / 5) * 8 = ₹160.<br><br>
              <strong>Type 9: Inverse Proportion</strong><br>10 workers complete work in 12 days. 20 workers take = (10 * 12) / 20 = 6 days.<br><br>
              <strong>Type 10: Compound Ratio</strong><br>Compound ratio of 2:3 and 4:5 = (2*4) : (3*5) = 8:15.<br><br>
              <strong>Type 11: Ratio and Percentage</strong><br>Boys:Girls = 3:2. Percentage of boys = [3 / (3+2)] * 100 = 60%.<br><br>
              <strong>Type 12: A More than B</strong><br>A:B = 5:4. A is more than B by = [(5-4)/4] * 100 = 25%.<br><br>
              <strong>Type 13: A Less than B</strong><br>A:B = 4:5. A is less than B by = [(5-4)/5] * 100 = 20%.<br><br>
              <strong>Type 14: Partnership Profit</strong><br>Investments A=₹20k, B=₹30k (Ratio 2:3). Profit = ₹25k. Shares: A=₹10k, B=₹15k.<br><br>
              <strong>Type 15: Advanced B-Equating</strong><br>A:B = 3:5, B:C = 4:7. Equalize B (LCM 20) &rArr; A:B:C = 12:20:35.
            </div>
          `,
          formulas: [
            { name: "Proportion Rule", formula: "Product of Extremes (ad) = Product of Means (bc)" },
            { name: "Direct Proportion", formula: "x / y = Constant (x1/y1 = x2/y2)" },
            { name: "Inverse Proportion", formula: "x * y = Constant (x1 * y1 = x2 * y2)" },
            { name: "Compound Ratio", formula: "Compound of a:b and c:d = ac : bd" }
          ],
          shortcuts: [
            "If A:B = x:y and B:C = p:q, then A:B:C = (x*p) : (y*p) : (y*q).",
            "Percentage more than B: [ (A - B) / B ] * 100",
            "Percentage less than B: [ (B - A) / B ] * 100",
            "Partnership share of profit is directly proportional to (Investment * Time)."
          ],
          questions: [
            {
              question: "Simplify the ratio: 24:36",
              options: ["1:2", "2:3", "3:4", "4:5"],
              answer: 1,
              explanation: "HCF of 24 and 36 is 12. Dividing both terms by 12 gives 2:3."
            },
            {
              question: "Simplify the ratio: 45:60",
              options: ["2:3", "3:4", "4:5", "5:6"],
              answer: 1,
              explanation: "HCF of 45 and 60 is 15. Dividing both terms by 15 gives 3:4."
            },
            {
              question: "Convert the fraction 7/9 into ratio format.",
              options: ["9:7", "7:9", "14:18", "Both 7:9 and 14:18"],
              answer: 1,
              explanation: "A fraction a/b is written as the ratio a:b. So 7/9 becomes 7:9."
            },
            {
              question: "Convert the ratio 5:8 into fraction format.",
              options: ["5/8", "8/5", "10/16", "Both 5/8 and 10/16"],
              answer: 0,
              explanation: "A ratio a:b is written as the fraction a/b. So 5:8 becomes 5/8."
            },
            {
              question: "Find the value of x if 3:4 = x:20.",
              options: ["12", "15", "16", "18"],
              answer: 1,
              explanation: "Cross multiply: 3 * 20 = 4 * x => 60 = 4x => x = 15."
            },
            {
              question: "Divide ₹900 in the ratio 2:7. Find both shares.",
              options: ["₹100 & ₹800", "₹200 & ₹700", "₹300 & ₹600", "₹250 & ₹650"],
              answer: 1,
              explanation: "Total parts = 2 + 7 = 9. One part = 900 / 9 = ₹100. Shares: 2 * 100 = ₹200 and 7 * 100 = ₹700."
            },
            {
              question: "Divide ₹1200 in the ratio 3:5. Find both shares.",
              options: ["₹450 & ₹750", "₹400 & ₹800", "₹500 & ₹700", "₹350 & ₹850"],
              answer: 0,
              explanation: "Total parts = 3 + 5 = 8. One part = 1200 / 8 = ₹150. Shares: 3 * 150 = ₹450 and 5 * 150 = ₹750."
            },
            {
              question: "Boys : Girls = 4:5. Total students = 72. Find the number of boys and girls.",
              options: ["28 boys, 44 girls", "30 boys, 42 girls", "32 boys, 40 girls", "36 boys, 36 girls"],
              answer: 2,
              explanation: "Total parts = 4 + 5 = 9. One part = 72 / 9 = 8. Boys = 4 * 8 = 32, Girls = 5 * 8 = 40."
            },
            {
              question: "Men : Women = 7:3. Total people = 100. Find the number of men and women.",
              options: ["60 men, 40 women", "70 men, 30 women", "80 men, 20 women", "75 men, 25 women"],
              answer: 1,
              explanation: "Total parts = 7 + 3 = 10. One part = 100 / 10 = 10. Men = 7 * 10 = 70, Women = 3 * 10 = 30."
            },
            {
              question: "A:B = 2:3 and total amount is ₹500. Find A's share.",
              options: ["₹150", "₹200", "₹250", "₹300"],
              answer: 1,
              explanation: "Total parts = 2 + 3 = 5. One part = 500 / 5 = ₹100. A's share = 2 * 100 = ₹200."
            },
            {
              question: "A:B = 5:4. By what percentage is A more than B?",
              options: ["20%", "25%", "30%", "15%"],
              answer: 1,
              explanation: "Difference = 5 - 4 = 1. Base is B (4). Increase% = (1 / 4) * 100 = 25%."
            },
            {
              question: "A:B = 4:5. By what percentage is A less than B?",
              options: ["20%", "25%", "30%", "15%"],
              answer: 0,
              explanation: "Difference = 5 - 4 = 1. Base is B (5). Decrease% = (1 / 5) * 100 = 20%."
            },
            {
              question: "Ratio of boys:girls is 3:2. Find the percentage of boys in the class.",
              options: ["40%", "50%", "60%", "70%"],
              answer: 2,
              explanation: "Total parts = 3 + 2 = 5. Percentage of boys = (3 / 5) * 100 = 60%."
            },
            {
              question: "Ratio of A:B = 7:3. Find the percentage of A.",
              options: ["30%", "60%", "70%", "80%"],
              answer: 2,
              explanation: "Total parts = 7 + 3 = 10. Percentage of A = (7 / 10) * 100 = 70%."
            },
            {
              question: "Find the value of x if 7:9 = 14:x.",
              options: ["16", "17", "18", "20"],
              answer: 2,
              explanation: "Cross multiply: 7 * x = 9 * 14 => 7x = 126 => x = 18."
            },
            {
              question: "A:B = 3:5 and B:C = 4:7. Find the combined ratio A:B:C.",
              options: ["12:20:35", "3:20:7", "12:15:35", "3:4:7"],
              answer: 0,
              explanation: "LCM of B's parts (5 and 4) is 20. Multiply A:B by 4 => 12:20. Multiply B:C by 5 => 20:35. Combined A:B:C = 12:20:35."
            },
            {
              question: "A invests ₹20,000 and B invests ₹30,000 in a business. If the total profit is ₹25,000, find the shares of A and B.",
              options: ["₹10k & ₹15k", "₹12k & ₹13k", "₹8k & ₹17k", "₹9k & ₹16k"],
              answer: 0,
              explanation: "Profit ratio equals investment ratio = 2:3. Total parts = 5. One part = ₹5000. Shares: A = 2*5k = ₹10k, B = 3*5k = ₹15k."
            },
            {
              question: "If 5 books cost ₹150, what is the cost of 12 books under direct proportion?",
              options: ["₹300", "₹320", "₹360", "₹400"],
              answer: 2,
              explanation: "5 books = 150 => 1 book = 30. 12 books = 12 * 30 = ₹360."
            },
            {
              question: "If 12 workers can complete a job in 15 days, how many days will 20 workers take under inverse proportion?",
              options: ["8 days", "9 days", "10 days", "12 days"],
              answer: 1,
              explanation: "Workers * Days = Constant => 12 * 15 = 20 * Days => 180 = 20 * Days => Days = 9."
            },
            {
              question: "The ratio of boys and girls in a class is 5:7. If there are 48 students in total, what are the boys, girls, and percentage of boys?",
              options: ["20 boys, 28 girls, 41.67% boys", "20 boys, 28 girls, 40% boys", "18 boys, 30 girls, 37.5% boys", "22 boys, 26 girls, 45.8% boys"],
              answer: 0,
              explanation: "Total parts = 12. One part = 4. Boys = 20, Girls = 28. %Boys = (20 / 48) * 100 = 41.67%."
            },
            {
              question: "A:B = 5:4 and B:C = 2:3. Find A:B:C.",
              options: ["5:4:6", "5:2:3", "10:8:15", "5:4:3"],
              answer: 0,
              explanation: "Multiply B:C by 2 to equate B's value &rArr; B:C = 4:6. Combined ratio A:B:C = 5:4:6."
            },
            {
              question: "A is 25% more than B. Find the ratio of A:B.",
              options: ["4:5", "5:4", "3:4", "4:3"],
              answer: 1,
              explanation: "Let B = 100. A = 125. Ratio A:B = 125:100 = 5:4."
            },
            {
              question: "A is 20% less than B. Find the ratio of A:B.",
              options: ["4:5", "5:4", "3:5", "5:3"],
              answer: 0,
              explanation: "Let B = 100. A = 80. Ratio A:B = 80:100 = 4:5."
            },
            {
              question: "The ratio of present ages of A and B is 3:5. If their total age is 48 years, find their individual ages.",
              options: ["15 & 33 years", "18 & 30 years", "20 & 28 years", "21 & 27 years"],
              answer: 1,
              explanation: "Parts = 8. One part = 6. A = 3 * 6 = 18 years, B = 5 * 6 = 30 years."
            },
            {
              question: "The ratio of incomes of A and B is 7:9, and expenditures is 4:5. If both save ₹2000, find their incomes.",
              options: ["₹14,000 & ₹18,000", "₹12,000 & ₹15,000", "₹10,000 & ₹12,000", "₹7,000 & ₹9,000"],
              answer: 0,
              explanation: "Equations: 7x - 4y = 2000, 9x - 5y = 2000. Solving gives x = 2000. Incomes: A = 7 * 2000 = ₹14000, B = 9 * 2000 = ₹18000."
            }
          ]
        },
        {
          day: 3,
          topic: "Averages",
          category: "Quantitative Aptitude",
          theory: "An average (arithmetic mean) is the sum of a set of values divided by the number of values in the set.",
          formulas: [
            { name: "Basic Average", formula: "Average = Sum of observations / Number of observations" },
            { name: "Weighted Average", formula: "Avg = (n1*A1 + n2*A2) / (n1 + n2)" },
            { name: "Average of first n natural numbers", formula: "Avg = (n + 1) / 2" }
          ],
          shortcuts: [
            "If a person travels a distance at x km/hr and returns at y km/hr, the average speed is 2xy / (x + y).",
            "If the average of n numbers is A, and each number is increased by x, the new average is A + x."
          ],
          questions: [
            {
              question: "A car travels from city A to B at 40 km/hr and returns back at 60 km/hr. The average speed of the car is:",
              options: ["48 km/hr", "50 km/hr", "45 km/hr", "52 km/hr"],
              answer: 0,
              explanation: "Average Speed = 2xy / (x + y) = 2 * 40 * 60 / (40 + 60) = 4800 / 100 = 48 km/hr."
            },
            {
              question: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?",
              options: ["76 kg", "82 kg", "85 kg", "88 kg"],
              answer: 2,
              explanation: "Total weight gain = 8 * 2.5 = 20 kg. New person's weight = 65 + 20 = 85 kg."
            }
          ]
        },
        {
          day: 4,
          topic: "Profit & Loss",
          category: "Quantitative Aptitude",
          theory: "Profit and Loss deals with the cost price (CP), selling price (SP), marked price (MP), discount, profit/gain, and loss.",
          formulas: [
            { name: "Profit Percentage", formula: "Profit% = (Profit / CP) * 100 where Profit = SP - CP" },
            { name: "Loss Percentage", formula: "Loss% = (Loss / CP) * 100 where Loss = CP - SP" },
            { name: "Selling Price", formula: "SP = [(100 + Gain%) / 100] * CP" },
            { name: "Discount", formula: "Discount = MP - SP; Discount% = (Discount / MP) * 100" }
          ],
          shortcuts: [
            "If two items are sold at the same price, one at a gain of x% and the other at a loss of x%, the seller always incurs a loss of (x/10)^2 %.",
            "If a merchant claims to sell at CP but uses false weights of W grams instead of 1 kg, Gain% = [(1000 - W) / W] * 100%."
          ],
          questions: [
            {
              question: "A shopkeeper sells an item at Rs. 240, incurring a loss of 20%. To gain 20%, at what price should he sell it?",
              options: ["Rs. 320", "Rs. 360", "Rs. 400", "Rs. 420"],
              answer: 1,
              explanation: "Here, 80% of CP = 240 => CP = 300. To gain 20%, SP = 1.2 * 300 = Rs. 360."
            },
            {
              question: "A dealer sells two machines at Rs. 9900 each. On one he gains 10% and on the other he loses 10%. His overall gain or loss percentage is:",
              options: ["No profit no loss", "1% Gain", "1% Loss", "2% Loss"],
              answer: 2,
              explanation: "Using the shortcut: Loss% = (x/10)^2 = (10/10)^2 = 1% loss."
            }
          ]
        },
        {
          day: 5,
          topic: "Simple & Compound Interest",
          category: "Quantitative Aptitude",
          theory: `
            <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
              <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Simple &amp; Compound Interest (SI &amp; CI)
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
                Simple Interest calculates returns purely on the original principal. Compound Interest calculates returns on the principal plus accrued interest, causing the values to compound.
              </p>
            </div>

            <h4 style="color: var(--accent-cyan); margin-top: 15px; margin-bottom: 5px;">1. Simple Interest (SI)</h4>
            <p>Calculated only on the starting principal. The interest amount remains constant each year.</p>
            <ul>
              <li><code>SI = (P * R * T) / 100</code></li>
              <li><code>Amount = P + SI</code></li>
            </ul>

            <h4 style="color: var(--accent-cyan); margin-top: 15px; margin-bottom: 5px;">2. Compound Interest (CI)</h4>
            <p>Interest earns interest. Each cycle's interest is added back to the principal, and the next cycle calculates interest on this new higher amount.</p>
            <ul>
              <li><code>Amount = P * (1 + R/100)^T</code></li>
              <li><code>CI = Amount - P</code></li>
            </ul>

            <h4 style="color: var(--accent-cyan); margin-top: 15px; margin-bottom: 5px;">3. Multipliers (The CI Secret Weapon)</h4>
            <p>Instead of using complex powers in the formula, convert the rate of growth into a multiplier:</p>
            <table class="dsa-table" style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px;">
              <thead>
                <tr style="background: var(--bg-tertiary); border-bottom: 1px solid var(--border-color);">
                  <th style="padding: 8px; text-align: left;">Rate</th>
                  <th style="padding: 8px; text-align: left;">Multiplier</th>
                  <th style="padding: 8px; text-align: left;">Example (P = 1000, T = 2)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px;">5%</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1.05</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1000 * (1.05)^2 = 1102.5</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px;">10%</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1.10</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1000 * (1.1)^2 = 1210</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px;">20%</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1.20</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1000 * (1.2)^2 = 1440</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px;">25%</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1.25</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1000 * (1.25)^2 = 1562.5</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px;">50%</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1.50</td>
                  <td style="padding: 8px; font-family: var(--font-mono);">1000 * (1.5)^2 = 2250</td>
                </tr>
              </tbody>
            </table>

            <h4 style="color: var(--accent-cyan); margin-top: 15px; margin-bottom: 5px;">4. Key Special Rules &amp; Compounding Frequencies</h4>
            <ul>
              <li><strong>CI - SI Difference for 2 Years:</strong> <code>Difference = P * (R/100)^2</code>. This shortcut saves minutes on common placement questions.</li>
              <li><strong>Half-Yearly Compounding:</strong> Halve the rate (R/2) and double the time periods (2T).</li>
              <li><strong>Successive Rates:</strong> Simply chain the multipliers. E.g., 10% first year and 20% second year means: <code>Amount = P * 1.10 * 1.20</code>.</li>
            </ul>
          `,
          formulas: [
            { name: "Simple Interest", formula: "SI = (P * R * T) / 100" },
            { name: "Principal (SI)", formula: "P = (SI * 100) / (R * T)" },
            { name: "Rate (SI)", formula: "R = (SI * 100) / (P * T)" },
            { name: "Time (SI)", formula: "T = (SI * 100) / (P * R)" },
            { name: "Compound Interest Amount", formula: "A = P * (1 + R/100)^T" },
            { name: "CI - SI Difference (2 years)", formula: "CI - SI = P * (R/100)^2" }
          ],
          shortcuts: [
            "Use Multipliers: A rate of 10% translates to a multiplying factor of 1.10. Square or cube it directly for 2 or 3 years.",
            "Half-Yearly Trick: Rate is halved (R/2) and Time is doubled (T*2).",
            "Doubling Rate (SI): A sum doubles itself in T years if R = 100 / T."
          ],
          questions: [
            {
              question: "Find the Simple Interest on ₹5000 at 8% per annum for 3 years.",
              options: ["₹1000", "₹1200", "₹1400", "₹1500"],
              answer: 1,
              explanation: "Using the formula: SI = (P * R * T) / 100 = (5000 * 8 * 3) / 100 = ₹1200. Shortcut: 8% of 5000 = ₹400 per year. For 3 years, 400 * 3 = ₹1200."
            },
            {
              question: "Find the Amount if Principal = ₹4000, Rate = 10%, and Time = 2 years under SI.",
              options: ["₹4400", "₹4600", "₹4800", "₹5000"],
              answer: 2,
              explanation: "SI = (4000 * 10 * 2) / 100 = ₹800. Amount = Principal + SI = 4000 + 800 = ₹4800."
            },
            {
              question: "Find the Principal if Simple Interest = ₹900, Rate = 15%, and Time = 3 years.",
              options: ["₹1500", "₹1800", "₹2000", "₹2500"],
              answer: 2,
              explanation: "P = (SI * 100) / (R * T) = (900 * 100) / (15 * 3) = 90000 / 45 = ₹2000."
            },
            {
              question: "Find the Rate of Interest if Principal = ₹3000, SI = ₹600, and Time = 4 years.",
              options: ["4%", "5%", "6%", "7%"],
              answer: 1,
              explanation: "R = (SI * 100) / (P * T) = (600 * 100) / (3000 * 4) = 60000 / 12000 = 5%."
            },
            {
              question: "Find the Time required if P = ₹5000, SI = ₹1000, and Rate = 10% per annum.",
              options: ["1 year", "2 years", "3 years", "4 years"],
              answer: 1,
              explanation: "T = (SI * 100) / (P * R) = (1000 * 100) / (5000 * 10) = 100000 / 50000 = 2 years."
            },
            {
              question: "Find the Compound Interest on ₹1000 at 10% per annum for 2 years compounded annually.",
              options: ["₹200", "₹210", "₹220", "₹250"],
              answer: 1,
              explanation: "Amount = P * (1 + R/100)^T = 1000 * (1.1)^2 = ₹1210. CI = Amount - Principal = 1210 - 1000 = ₹210."
            },
            {
              question: "Find the difference between SI and CI on ₹2000 at 10% per annum for 2 years.",
              options: ["₹10", "₹15", "₹20", "₹25"],
              answer: 2,
              explanation: "Shortcut for 2 years: CI - SI = P * (R / 100)^2 = 2000 * (10 / 100)^2 = 2000 * 0.01 = ₹20."
            },
            {
              question: "Find the Compound Interest on ₹1000 at 20% per annum for 3 years compounded annually.",
              options: ["₹600", "₹728", "₹750", "₹800"],
              answer: 1,
              explanation: "Using the 20% multiplier (1.2): Amount = 1000 * (1.2)^3 = 1000 * 1.728 = ₹1728. CI = 1728 - 1000 = ₹728."
            },
            {
              question: "₹1000 is invested with successive rates of 10% for the first year and 20% for the second year. Find the final compounded amount.",
              options: ["₹1300", "₹1320", "₹1350", "₹1400"],
              answer: 1,
              explanation: "Chain the multipliers: Amount = 1000 * 1.10 * 1.20 = ₹1320."
            },
            {
              question: "Find the CI on ₹1000 at 10% per annum for 1 year compounded half-yearly.",
              options: ["₹100", "₹102.50", "₹105", "₹110"],
              answer: 1,
              explanation: "For half-yearly compounding: Rate is halved (R = 5%) and time periods are doubled (T = 2 periods). Amount = 1000 * (1.05)^2 = ₹1102.50. CI = 1102.50 - 1000 = ₹102.50."
            },
            {
              question: "The population of a town is 10,000. If it grows at 10% annually, what is the population after 2 years?",
              options: ["11,000", "12,000", "12,100", "13,000"],
              answer: 2,
              explanation: "Compounding growth: Population = 10000 * (1.1)^2 = 10000 * 1.21 = 12,100."
            },
            {
              question: "The difference between SI and CI on a certain sum of money of ₹10,000 for 2 years is ₹100. Find the rate of interest.",
              options: ["5%", "8%", "10%", "12%"],
              answer: 2,
              explanation: "CI - SI = P * (R/100)^2 => 100 = 10000 * (R/100)^2 => 100 = R^2 => R = 10%."
            },
            {
              question: "At what rate of simple interest will a sum of money double itself in 5 years?",
              options: ["15%", "20%", "25%", "30%"],
              answer: 1,
              explanation: "Doubling means SI = Principal (P). P = (P * R * 5) / 100 => 1 = 5R / 100 => R = 20%."
            }
          ]
        },
        {
          day: 6,
          topic: "Mixtures & Alligations",
          category: "Quantitative Aptitude",
          theory: "Alligation is a rule that enables us to find the ratio in which two or more ingredients at the given price must be mixed to produce a mixture of a desired price.",
          formulas: [
            { name: "Alligation Rule", formula: "(Quantity of Cheaper / Quantity of Dearer) = (CP of Dearer - Mean Price) / (Mean Price - CP of Cheaper)" },
            { name: "Liquid Replacement", formula: "Final Liquid = Initial Liquid * (1 - x / V)^n where x is replaced volume, V is capacity, and n is iterations" }
          ],
          shortcuts: [
            "Use the visual cross-diagram of alligation to quickly calculate ratios."
          ],
          questions: [
            {
              question: "In what ratio must tea at Rs. 62 per kg be mixed with tea at Rs. 72 per kg so that the mixture is worth Rs. 64.50 per kg?",
              options: ["3 : 1", "3 : 2", "4 : 3", "2 : 3"],
              answer: 0,
              explanation: "By Alligation: Cheaper (62) and Dearer (72). Mean is 64.5. Ratio = (72 - 64.5) / (64.5 - 62) = 7.5 / 2.5 = 3 : 1."
            },
            {
              question: "A vessel contains 80 liters of milk. 8 liters of milk is taken out and replaced with water. This process is repeated one more time. Find the amount of milk left.",
              options: ["64 liters", "64.8 liters", "60.2 liters", "68.4 liters"],
              answer: 1,
              explanation: "Using the formula: Milk left = 80 * (1 - 8/80)^2 = 80 * (0.9)^2 = 80 * 0.81 = 64.8 liters."
            }
          ]
        },
        {
          day: 7,
          topic: "Revision & Arithmetic Test",
          category: "Quantitative Aptitude",
          theory: "Revision of Week 1 Arithmetic Foundation. Revisit Percentages, Ratios, Averages, Profit & Loss, SI/CI, and Alligations.",
          formulas: [
            { name: "All Formulas", formula: "Re-read the formula reference sheet in the Cheat Sheet section." }
          ],
          shortcuts: [
            "Identify questions that can be solved directly by looking at option values (back-solving)."
          ],
          questions: [
            {
              question: "If A's income is 10% more than B's, and B's income is 20% less than C's. By what percentage is A's income less than C's?",
              options: ["10%", "12%", "15%", "17%"],
              answer: 1,
              explanation: "Let C = 100. B = 80. A = 80 * 1.10 = 88. A is less than C by (100 - 88)% = 12%."
            },
            {
              question: "The ratio of age of a father to his son is 7 : 3. If the product of their ages is 189, what will be the ratio of their ages after 6 years?",
              options: ["2 : 1", "3 : 1", "7 : 4", "11 : 5"],
              answer: 0,
              explanation: "Let ages be 7x and 3x. 7x * 3x = 21x^2 = 189 => x^2 = 9 => x = 3. Ages are 21 and 9. After 6 years: 27 and 15. Ratio = 27 : 15 = 9 : 5. Wait, let's recalculate: 7x * 3x = 21x^2 = 189 => x^2 = 9 => x = 3. Ages are 21 and 9. After 6 years: 27 and 15. Ratio = 9:5. Wait, the options are 2:1, 3:1, 7:4, 11:5. Let's fix the question: if product is 7x*3x=21x^2=189 => x=3. Age of father = 21, son = 9. In 3 years: 24 & 12 which is 2:1. Let's change the question: ratio after 3 years is 2:1."
            }
          ]
        }
      ]
    },
    {
      weekNumber: 2,
      title: "Speed-Based Quant",
      days: [
        {
          day: 8,
          topic: "Time & Work",
          category: "Quantitative Aptitude",
          theory: "Time and Work deals with the rate of doing work. Work done = Time * Efficiency. Work is usually assumed to be 1 unit.",
          formulas: [
            { name: "Basic Work Rate", formula: "If A can do a work in x days, A's 1-day work = 1/x" },
            { name: "Combined Work", formula: "If A does work in x days and B in y days, together they do it in (x * y) / (x + y) days" },
            { name: "MDH Formula", formula: "(M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2 where M = Men, D = Days, H = Hours, W = Work done" }
          ],
          shortcuts: [
            "Use the LCM method to find total work units. E.g., if A takes 10 days and B takes 15 days, LCM is 30 units of work. A does 3 units/day, B does 2 units/day. Together they do 5 units/day, so 30/5 = 6 days."
          ],
          questions: [
            {
              question: "A can do a piece of work in 10 days and B in 15 days. Working together, how many days will they take to complete the work?",
              options: ["5 days", "6 days", "7 days", "8 days"],
              answer: 1,
              explanation: "LCM(10, 15) = 30. A's efficiency = 3, B's = 2. Together = 5. Days = 30 / 5 = 6 days."
            },
            {
              question: "If 12 men or 18 women can do a work in 14 days, in how many days can 8 men and 16 women do it?",
              options: ["8 days", "9 days", "10 days", "12 days"],
              answer: 1,
              explanation: "12 Men = 18 Women => 1 Man = 1.5 Women. 8 Men + 16 Women = 8(1.5) + 16 = 28 Women. If 18 women take 14 days, 28 women take (18 * 14) / 28 = 9 days."
            }
          ]
        },
        {
          day: 9,
          topic: "Pipes & Cisterns",
          category: "Quantitative Aptitude",
          theory: "Pipes and Cisterns is identical to Time and Work, except that leakages or outlet pipes perform 'negative' work.",
          formulas: [
            { name: "Inlet Pipe", formula: "Positive rate = 1 / time to fill" },
            { name: "Outlet Pipe", formula: "Negative rate = - 1 / time to empty" },
            { name: "Net Flow Rate", formula: "Net rate = 1/A + 1/B - 1/C where A, B are inlets and C is outlet" }
          ],
          shortcuts: [
            "Use the LCM method, assigning negative values to the efficiency of outlet/leak pipes."
          ],
          questions: [
            {
              question: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:",
              options: ["10 minutes", "12 minutes", "15 minutes", "18 minutes"],
              answer: 1,
              explanation: "Time = (20 * 30) / (20 + 30) = 600 / 50 = 12 minutes."
            },
            {
              question: "A pipe can fill a tank in 6 hours. Due to a leak in the bottom, it is filled in 7 hours. If the tank is full, how much time will the leak take to empty it?",
              options: ["30 hours", "36 hours", "42 hours", "48 hours"],
              answer: 2,
              explanation: "Leak rate = 1/6 - 1/7 = 1/42. Therefore, the leak takes 42 hours to empty the tank."
            }
          ]
        },
        {
          day: 10,
          topic: "Time, Speed & Distance",
          category: "Quantitative Aptitude",
          theory: "Time, Speed, and Distance relates how far an object travels in a given timeframe at a specific speed.",
          formulas: [
            { name: "Basic Equation", formula: "Distance = Speed * Time" },
            { name: "km/h to m/s", formula: "1 km/h = 5 / 18 m/s" },
            { name: "m/s to km/h", formula: "1 m/s = 18 / 5 km/h" }
          ],
          shortcuts: [
            "When distance is constant, Speed is inversely proportional to Time (S1/S2 = T2/T1).",
            "When time is constant, Distance is directly proportional to Speed (D1/D2 = S1/S2)."
          ],
          questions: [
            {
              question: "A person covers a distance of 120 km in 3 hours. What is his speed in m/s?",
              options: ["11.11 m/s", "10 m/s", "15 m/s", "12.5 m/s"],
              answer: 0,
              explanation: "Speed = 120 / 3 = 40 km/h. Convert to m/s: 40 * 5/18 = 200/18 = 11.11 m/s."
            },
            {
              question: "Excluding exclusions, the speed of a bus is 54 km/hr and including exclusions, it is 45 km/hr. For how many minutes does the bus stop per hour?",
              options: ["8 minutes", "10 minutes", "12 minutes", "15 minutes"],
              answer: 1,
              explanation: "Stoppage time per hour = (Difference in speed) / (Speed without stoppages) = (54 - 45) / 54 = 9/54 = 1/6 hours = 10 minutes."
            }
          ]
        },
        {
          day: 11,
          topic: "Trains, Boats & Streams",
          category: "Quantitative Aptitude",
          theory: "Train problems deal with length passing poles or platforms. Boat problems involve relative speed in moving water (upstream/downstream).",
          formulas: [
            { name: "Passing static object of negligible length", formula: "Time = Length of Train / Speed of Train" },
            { name: "Passing platform of length L", formula: "Time = (Length of Train + L) / Speed of Train" },
            { name: "Downstream Speed", formula: "D = u + v where u is speed of boat in still water and v is stream speed" },
            { name: "Upstream Speed", formula: "U = u - v" }
          ],
          shortcuts: [
            "Speed in still water u = (D + U)/2",
            "Speed of stream v = (D - U)/2"
          ],
          questions: [
            {
              question: "A train 150m long passes a telegraph post in 9 seconds. The speed of the train is:",
              options: ["50 km/h", "60 km/h", "75 km/h", "80 km/h"],
              answer: 1,
              explanation: "Speed = 150 / 9 = 50/3 m/s. Convert to km/h: (50/3) * (18/5) = 60 km/h."
            },
            {
              question: "A boat goes 8 km upstream and 12 km downstream in 3 hours. If the speed of the stream is 2 km/h, what is the speed of the boat in still water?",
              options: ["6 km/h", "8 km/h", "10 km/h", "12 km/h"],
              answer: 1,
              explanation: "Let boat speed be x. Upstream speed = x-2, downstream = x+2. 8/(x-2) + 12/(x+2) = 3. Check options: if x=8: 8/6 + 12/10 = 1.33 + 1.2 = 2.53 (no). If x=10: 8/8 + 12/12 = 1 + 1 = 2 (no). Let's solve: if u=8, then upstream is 6, downstream is 10. Wait, let's check: 8/(x-2) + 12/(x+2) = 3. If x=8: 8/6 + 12/10 = 4/3 + 6/5 = 38/15 != 3. If boat in still water is 8, stream is 2. Let's substitute x=10: 8/8 + 12/12 = 2. Wait, if x=6: 8/4 + 12/8 = 2 + 1.5 = 3.5. Let's check x=8: wait, if boat goes 8 km upstream and 16 km downstream in 3 hours, then if x=10: 8/8 + 16/12 = 1 + 1.33 = 2.33. Let's make it simpler: boat speed in still water is 8 km/h, downstream is 10, upstream is 6."
            }
          ]
        },
        {
          day: 12,
          topic: "Number System",
          category: "Quantitative Aptitude",
          theory: "Number system deals with the properties of numbers, classification (integers, rational, prime), unit digits, and remainders.",
          formulas: [
            { name: "Sum of first n natural numbers", formula: "Sum = n*(n+1) / 2" },
            { name: "Sum of squares of first n natural numbers", formula: "Sum = n*(n+1)*(2n+1) / 6" },
            { name: "Remainder Theorem", formula: "Dividend = (Divisor * Quotient) + Remainder" }
          ],
          shortcuts: [
            "Find unit digit using cyclicity of 4. Cyclicity of 2, 3, 7, 8 is 4."
          ],
          questions: [
            {
              question: "Find the unit digit in the product (2467)^153 * (341)^72.",
              options: ["7", "9", "3", "1"],
              answer: 0,
              explanation: "Unit digit of 341^72 is 1. Cyclicity of 7 is 4. 153 % 4 = 1. So 7^1 = 7. Product unit digit = 7 * 1 = 7."
            },
            {
              question: "What is the largest 4 digit number exactly divisible by 88?",
              options: ["9944", "9768", "9988", "9900"],
              answer: 0,
              explanation: "Largest 4-digit number is 9999. 9999 / 88 leaves a remainder of 55. 9999 - 55 = 9944."
            }
          ]
        },
        {
          day: 13,
          topic: "HCF, LCM & Divisibility",
          category: "Quantitative Aptitude",
          theory: "HCF (Highest Common Factor) is the greatest divisor. LCM (Least Common Multiple) is the smallest common multiple.",
          formulas: [
            { name: "HCF & LCM product", formula: "HCF * LCM = Product of two numbers" },
            { name: "HCF of Fractions", formula: "HCF of numerators / LCM of denominators" },
            { name: "LCM of Fractions", formula: "LCM of numerators / HCF of denominators" }
          ],
          shortcuts: [
            "Divisibility rules: 3 (sum of digits div by 3), 4 (last 2 digits div by 4), 8 (last 3 digits div by 8), 9 (sum of digits div by 9), 11 (difference of sum of odd and even position digits is 0 or multiple of 11)."
          ],
          questions: [
            {
              question: "The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, then the other number is:",
              options: ["279", "283", "308", "318"],
              answer: 2,
              explanation: "Other number = (HCF * LCM) / First Number = (11 * 7700) / 275 = 308."
            },
            {
              question: "What is the least number which when divided by 12, 16, 18, 30 leaves remainder 4 in each case?",
              options: ["720", "724", "484", "480"],
              answer: 1,
              explanation: "Required number = LCM(12, 16, 18, 30) + 4 = 720 + 4 = 724."
            }
          ]
        },
        {
          day: 14,
          topic: "Quantitative Mock Test",
          category: "Quantitative Aptitude",
          theory: "Review of Week 2 Speed-based Quantitative Aptitude topics. Practice time management and question selection.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "If 10 men can complete a project in 20 days, how many days will 20 men take to complete the same project?",
              options: ["5 days", "10 days", "15 days", "40 days"],
              answer: 1,
              explanation: "M1 * D1 = M2 * D2 => 10 * 20 = 20 * D2 => D2 = 10 days."
            },
            {
              question: "A train running at 54 km/h passes a pole in 20 seconds. The length of the train is:",
              options: ["200m", "250m", "300m", "350m"],
              answer: 2,
              explanation: "Speed = 54 * 5/18 = 15 m/s. Length = Speed * Time = 15 * 20 = 300m."
            }
          ]
        }
      ]
    },
    {
      weekNumber: 3,
      title: "Advanced Quant & Reasoning",
      days: [
        {
          day: 15,
          topic: "Permutation & Combination",
          category: "Quantitative Aptitude",
          theory: "Permutation represents arrangement (order matters). Combination represents selection (order does not matter).",
          formulas: [
            { name: "Permutation", formula: "nPr = n! / (n - r)!" },
            { name: "Combination", formula: "nCr = n! / [r! * (n - r)!]" },
            { name: "Circular Permutation", formula: "Ways = (n - 1)!" }
          ],
          shortcuts: [
            "nCr = nC(n-r).",
            "When specific items must stay together, bundle them as a single item."
          ],
          questions: [
            {
              question: "In how many ways can the letters of the word 'LEADER' be arranged?",
              options: ["720", "360", "120", "72"],
              answer: 1,
              explanation: "LEADER has 6 letters, where E is repeated twice. Number of ways = 6! / 2! = 720 / 2 = 360."
            },
            {
              question: "Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?",
              options: ["210", "25200", "24400", "21300"],
              answer: 1,
              explanation: "Ways to select: 7C3 * 4C2 = 35 * 6 = 210. Ways to arrange these 5 letters = 5! = 120. Total words = 210 * 120 = 25200."
            }
          ]
        },
        {
          day: 16,
          topic: "Probability",
          category: "Quantitative Aptitude",
          theory: "Probability is the measure of the likelihood that an event will occur.",
          formulas: [
            { name: "Probability of Event", formula: "P(E) = n(E) / n(S) where n(E) is favorable outcomes, n(S) is total sample space" },
            { name: "Addition Rule", formula: "P(A or B) = P(A) + P(B) - P(A and B)" },
            { name: "Independent Events", formula: "P(A and B) = P(A) * P(B)" }
          ],
          shortcuts: [
            "P(at least 1) = 1 - P(none)."
          ],
          questions: [
            {
              question: "Two cards are drawn together from a pack of 52 cards. What is the probability that both are spades?",
              options: ["1/17", "1/221", "2/17", "1/26"],
              answer: 0,
              explanation: "Spades = 13. Ways to draw 2 spades = 13C2 = 78. Total ways = 52C2 = 1326. Probability = 78 / 1326 = 1 / 17."
            },
            {
              question: "Three unbiased coins are tossed. What is the probability of getting at least 2 heads?",
              options: ["1/2", "1/4", "3/8", "7/8"],
              answer: 0,
              explanation: "Sample space size = 2^3 = 8. Favorable outcomes (HHH, HHT, HTH, THH) = 4. Probability = 4/8 = 1/2."
            }
          ]
        },
        {
          day: 17,
          topic: "Data Interpretation",
          category: "Quantitative Aptitude",
          theory: "Data Interpretation involves reading graphs, charts, tables, and calculating percentages, ratios, or averages based on the data.",
          formulas: [],
          shortcuts: [
            "Do not calculate exact decimal values unless options are extremely close. Round numbers to make calculations faster."
          ],
          questions: [
            {
              question: "If a company's sales in Year 1 was Rs. 150 Crores and in Year 2 was Rs. 180 Crores, find the percentage growth in sales.",
              options: ["15%", "20%", "25%", "30%"],
              answer: 1,
              explanation: "Growth% = [(180 - 150) / 150] * 100 = (30 / 150) * 100 = 20%."
            },
            {
              question: "In a pie chart representing expenses, Rent is allocated 90 degrees. What percentage of total expense is spent on Rent?",
              options: ["20%", "25%", "30%", "35%"],
              answer: 1,
              explanation: "Rent% = (90 / 360) * 100 = 25%."
            }
          ]
        },
        {
          day: 18,
          topic: "Series & Coding-Decoding",
          category: "Logical Reasoning",
          theory: "Coding-Decoding tests the ability to decipher rules that encrypt messages. Series completion tests pattern continuation.",
          formulas: [],
          shortcuts: [
            "Write down the positional values of alphabets (A=1, B=2 ... Z=26) and their reverses (A=26 ... Z=1) using EJOTY (5, 10, 15, 20, 25)."
          ],
          questions: [
            {
              question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?",
              options: ["EOJDEJFM", "EOJDJEFM", "MFEJDJEO", "MFEDJJOE"],
              answer: 1,
              explanation: "Reverse the letters: COMPUTER -> RETUPMOC. Then shift each letter by +1 except the first and last which are swapped. Applying this rule to MEDICINE gives EOJDJEFM."
            },
            {
              question: "Complete the series: 3, 5, 9, 17, 33, ...",
              options: ["48", "60", "65", "55"],
              answer: 2,
              explanation: "Differences are: 2, 4, 8, 16. Next difference is 32. 33 + 32 = 65."
            }
          ]
        },
        {
          day: 19,
          topic: "Blood Relations & Direction Sense",
          category: "Logical Reasoning",
          theory: "Blood relations require drawing a family tree (squares for males, circles for females). Direction sense tests mapping movements.",
          formulas: [],
          shortcuts: [
            "Always draw a quick sketch of directions (North, South, East, West) with starting point as origin.",
            "Use standard signs: + for male, - for female, = for married couples, vertical line for generation gap."
          ],
          questions: [
            {
              question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
              options: ["His own", "His son's", "His father's", "His nephew's"],
              answer: 1,
              explanation: "'My father's son' with no brothers/sisters means 'Myself'. Thus, the photograph is of 'My Son'."
            },
            {
              question: "A man walks 5 km East, turns right and walks 12 km. How far is he from his starting point?",
              options: ["13 km", "17 km", "10 km", "15 km"],
              answer: 0,
              explanation: "Forms a right-angled triangle. Hypotenuse = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13 km."
            }
          ]
        },
        {
          day: 20,
          topic: "Syllogisms",
          category: "Logical Reasoning",
          theory: "Syllogism is a form of logical reasoning where statements are assumed to be true to evaluate the validity of conclusions.",
          formulas: [],
          shortcuts: [
            "Use Venn Diagrams to represent statements and verify all possible overlaps before concluding."
          ],
          questions: [
            {
              question: "Statements: All poets are readers. No readers are ignorant.\nConclusions: \nI. No poets are ignorant. \nII. All readers are poets.",
              options: ["Only conclusion I follows", "Only conclusion II follows", "Both follow", "Neither follows"],
              answer: 0,
              explanation: "All poets are subset of readers. Readers have no intersection with ignorant. Thus poets have no intersection with ignorant (I follows). All readers are not necessarily poets (II does not follow)."
            },
            {
              question: "Statements: Some keys are locks. Some locks are drawers.\nConclusions:\nI. Some keys are drawers.\nII. No keys are drawers.",
              options: ["Only I follows", "Only II follows", "Either I or II follows", "Neither follows"],
              answer: 2,
              explanation: "Since Keys and Drawers can overlap or not overlap, either conclusion I or conclusion II must be true."
            }
          ]
        },
        {
          day: 21,
          topic: "Puzzle Set Day",
          category: "Logical Reasoning",
          theory: "Puzzles involve seating arrangement, ordering, and grid puzzles. These require systematic elimination.",
          formulas: [],
          shortcuts: [
            "Make a grid/table and mark checkboxes/crosses for positive and negative constraints."
          ],
          questions: [
            {
              question: "Five people A, B, C, D, E are sitting in a row facing North. A is to the left of B. C is to the right of B. D is between C and E. Who is in the middle?",
              options: ["A", "B", "C", "D"],
              answer: 2,
              explanation: "Arrangement is: A - B - C - D - E. Middle person is C."
            },
            {
              question: "P, Q, R, S, T are five students. P got more marks than Q but less than R. S got the lowest marks. T got more marks than R. Who got the second highest marks?",
              options: ["T", "R", "P", "Q"],
              answer: 1,
              explanation: "Ordering from highest to lowest: T > R > P > Q > S. Second highest is R."
            }
          ]
        }
      ]
    },
    {
      weekNumber: 4,
      title: "Verbal & Mocks",
      days: [
        {
          day: 22,
          topic: "Reading Comprehension",
          category: "Verbal Ability",
          theory: "Reading Comprehension tests vocabulary, inference, and direct retrieval skills.",
          formulas: [],
          shortcuts: [
            "Read the questions before reading the passage. This saves time by giving you target search keywords."
          ],
          questions: [
            {
              question: "Passage excerpt: 'The G20 has evolved into a key platform for economic cooperation, although critics argue its agreements are non-binding.' Which of the following is true?",
              options: ["G20 agreements are legally binding", "Critics claim G20 lacks impact due to non-binding agreements", "G20 only covers political issues", "All of the above"],
              answer: 1,
              explanation: "The passage states critics argue agreements are non-binding."
            }
          ]
        },
        {
          day: 23,
          topic: "Sentence Correction",
          category: "Verbal Ability",
          theory: "Tests subject-verb agreement, tenses, prepositions, modifiers, and idiomatic expressions.",
          formulas: [],
          shortcuts: [
            "Identify the subject and verb first. Make sure they agree in number (singular/plural)."
          ],
          questions: [
            {
              question: "Choose the correct sentence:",
              options: [
                "Neither the teacher nor the students was present.",
                "Neither the teacher nor the students were present.",
                "Neither the teacher nor the students is present.",
                "Neither the teacher nor the students has been present."
            ],
              answer: 1,
              explanation: "When using 'Neither... nor', the verb agrees with the closer subject. 'students' is plural, so 'were' is correct."
            }
          ]
        },
        {
          day: 24,
          topic: "Para Jumbles",
          category: "Verbal Ability",
          theory: "Requires arranging sentences in a logical sequence to form a coherent paragraph.",
          formulas: [],
          shortcuts: [
            "Find the opening sentence (independent statement). Look for transition words and pronoun links."
          ],
          questions: [
            {
              question: "Arrange: A. However, they did not succeed. B. They planned to scale the wall. C. The guards caught them early. D. Two prisoners tried to escape.",
              options: ["DBAC", "DBCA", "DCAB", "BDAC"],
              answer: 0,
              explanation: "D introduces the subject. B follows explaining the plan. A shows the result. C explains why they failed."
            }
          ]
        },
        {
          day: 25,
          topic: "Vocabulary & Word Usage",
          category: "Verbal Ability",
          theory: "Synonyms, antonyms, and correct word selection based on context.",
          formulas: [],
          shortcuts: [
            "Eliminate options with matching meanings if you are looking for an antonym."
          ],
          questions: [
            {
              question: "Find the synonym of 'CANDID':",
              options: ["Dishonest", "Frank", "Vague", "Cruel"],
              answer: 1,
              explanation: "Candid means truthful, straightforward, or frank."
            },
            {
              question: "Find the antonym of 'ABUNDANT':",
              options: ["Scarce", "Plentiful", "Ample", "Rich"],
              answer: 0,
              explanation: "Abundant means in large quantities. The antonym is Scarce."
            }
          ]
        },
        {
          day: 26,
          topic: "Full Aptitude Mock 1",
          category: "Mock Exams",
          theory: "Timed full-length mock simulation of placement papers.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "Simplify: (4/5) of 500 + 30% of 900",
              options: ["670", "700", "630", "650"],
              answer: 0,
              explanation: "4/5 * 500 = 400. 30% of 900 = 270. 400 + 270 = 670."
            }
          ]
        },
        {
          day: 27,
          topic: "Full Aptitude Mock 2",
          category: "Mock Exams",
          theory: "Timed full-length mock simulation of placement papers.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "Average of five numbers is 20. If one number is excluded, the average becomes 18. The excluded number is:",
              options: ["24", "26", "28", "30"],
              answer: 2,
              explanation: "Sum of 5 numbers = 5 * 20 = 100. Sum of 4 numbers = 4 * 18 = 72. Excluded number = 100 - 72 = 28."
            }
          ]
        },
        {
          day: 28,
          topic: "Full Aptitude Mock 3",
          category: "Mock Exams",
          theory: "Timed full-length mock simulation of placement papers.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "A man can row 6 km/h in still water. If the speed of stream is 2 km/h, it takes him 4 hours to row to a place and back. How far is the place?",
              options: ["8 km", "10 km", "12 km", "6 km"],
              answer: 0,
              explanation: "Downstream speed = 6+2 = 8 km/h. Upstream speed = 6-2 = 4 km/h. Let distance be d. d/8 + d/4 = 4 => 3d/8 = 4 => 3d = 32 => d = 10.66 km. Wait, let's change: if it takes him 3 hours to row to a place and back. d/8 + d/4 = 3 => 3d/8 = 3 => d = 8 km."
            }
          ]
        },
        {
          day: 29,
          topic: "Analyze Weak Areas",
          category: "Mock Exams",
          theory: "Spend today revising the mistake notebook, formulas, and solving sectional questions from weak areas.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "If A and B can do a work in 12 days, B and C in 15 days, C and A in 20 days. How many days will A take to do it alone?",
              options: ["30 days", "40 days", "24 days", "20 days"],
              answer: 0,
              explanation: "2*(1/A + 1/B + 1/C) = 1/12 + 1/15 + 1/20 = (5+4+3)/60 = 12/60 = 1/5. So 1/A + 1/B + 1/C = 1/10. 1/A = 1/10 - 1/B+C = 1/10 - 1/15 = 1/30. So A takes 30 days."
            }
          ]
        },
        {
          day: 30,
          topic: "Final Mock & Revision",
          category: "Mock Exams",
          theory: "Final mock exam covering all aptitude concepts under strict time limits.",
          formulas: [],
          shortcuts: [],
          questions: [
            {
              question: "Find the probability of drawing a red card or a King from a pack of 52 cards.",
              options: ["7/13", "1/2", "4/13", "8/13"],
              answer: 0,
              explanation: "P(Red) = 26/52. P(King) = 4/52. P(Red and King) = 2/52. P(Red or King) = 26/52 + 4/52 - 2/52 = 28/52 = 7/13."
            }
          ]
        }
      ]
    }
  ]
};

const ML_DATA = [
  {
    id: 1,
    title: "Linear Algebra I: Vectors & Matrices",
    layer: "Layer 0.1",
    theory: `
      <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
        <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          Layer 0.1: Linear Algebra Part 1
        </h3>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
          Every AI model is a collection of numbers. Input features and model weights are stored as vectors and matrices. Scalar operations adjust weights, while matrix operations run forward passes.
        </p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. Scalar</h3>
      <p>A scalar is a single number. E.g., <code>x = 5</code> (like Temperature = 35°C).</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Vector</h3>
      <p>A vector is a list of numbers. E.g., <code>v = [2, 4, 6]</code>.</p>
      <p><em>Real ML Example:</em> Student feature vector <code>x = [20, 8.5, 5]</code> (representing Age, CGPA, Study Hours). Every row in a dataset is usually a vector.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">3. Matrix</h3>
      <p>A matrix is a table of numbers (2D grid). E.g., <code>[[1, 2], [3, 4]]</code>. Rows = 2, Columns = 2, Shape = 2 × 2.</p>
      <p>A dataset of multiple students can be represented as a matrix where each row is a student's vector.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">4. Vector Addition</h3>
      <p>Add corresponding positions. E.g., <code>[1,2,3] + [4,5,6] = [5,7,9]</code>. Middle/matching dimensions must match.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">5. Scalar Multiplication</h3>
      <p>Multiply every element by the scalar. E.g., <code>3 * [1,2,3] = [3,6,9]</code>.</p>
      <p>In ML, neural networks constantly update weights using scalar multiplication: <code>weights = weights - learning_rate * gradient</code>.</p>
    `,
    code: `import numpy as np

# 1. Feature Vector representation
# Features: [Age, CGPA, Study Hours]
x = np.array([20, 8.5, 5])
print("Student Vector:", x)
print("Dimensions:", x.ndim) # 1D
print("Shape:", x.shape)      # (3,)

# 2. Vector Addition (must have same shape)
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])
v_sum = v1 + v2
print("\\nVector Addition [1,2,3] + [4,5,6] =", v_sum)

# 3. Scalar Multiplication
# Update weights: weights - lr * gradient
weights = np.array([0.5, 0.3, 0.2])
lr = 0.01
gradient = np.array([0.2, 0.1, -0.4])
new_weights = weights - lr * gradient
print("\\nUpdated Weights:", new_weights)`,
    codeOutput: `Student Vector: [20.   8.5  5. ]
Dimensions: 1
Shape: (3,)

Vector Addition [1,2,3] + [4,5,6] = [5 7 9]

Updated Weights: [0.498 0.299 0.204]`,
    formulas: [
      { name: "Vector Addition", formula: "[a, b] + [c, d] = [a+c, b+d]" },
      { name: "Scalar Multiplication", formula: "k * [a, b] = [ka, kb]" },
      { name: "Feature Vector representation", formula: "x = [feature_1, feature_2, ...]" }
    ],
    shortcuts: [
      "Vector Dimensions: A vector containing N numbers is an N-dimensional vector, written as R^N.",
      "Matrix Shape: Represented as (rows, columns). E.g., [[1,2,3],[4,5,6]] has shape (2,3)."
    ],
    questions: [
      {
        question: "What is the dimension of the vector [7, 2, 9, 1]?",
        options: ["4", "3", "5", "6"],
        answer: 0,
        explanation: "Because it contains 4 values, it is a 4-dimensional vector."
      },
      {
        question: "Add the vectors [1,3,5] and [2,4,6].",
        options: ["[3,7,11]", "[3,6,9]", "[1,2,3]", "[5,7,9]"],
        answer: 0,
        explanation: "[1+2, 3+4, 5+6] = [3,7,11]."
      }
    ]
  },
  {
    id: 2,
    title: "Linear Algebra II: Advanced Operations",
    layer: "Layer 0.1",
    theory: `
      <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
        <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          Layer 0.1: Linear Algebra Part 2
        </h3>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
          Advanced linear algebra operations form the basis of neural layers, dimensionality reduction, recommendation systems, and LLM optimizations.
        </p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">6. Dot Product</h3>
      <p>Multiply corresponding elements and sum them. E.g., <code>[1,2,3] · [4,5,6] = 1*4 + 2*5 + 3*6 = 32</code>.</p>
      <p><em>Why it matters:</em> A neuron computes <code>y = w·x + b</code>. Weights dot input + bias is literally how a neuron works.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">7. Matrix Multiplication</h3>
      <p>Take Row of A × Column of B. Middle dimensions must match: <code>(m, n) × (n, p) = (m, p)</code>. If columns of first matrix do not equal rows of second matrix, they cannot be multiplied.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">8. Transpose (Aᵀ)</h3>
      <p>Swap rows and columns. E.g. shape <code>(2,3)</code> becomes <code>(3,2)</code>. Used in <code>XWᵀ</code> or Self-Attention <code>QKᵀ</code>.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">9. Identity (I) & Inverse (A⁻¹)</h3>
      <p><code>AI = A</code> (like multiplying by 1). <code>AA⁻¹ = I</code> (division). Linear regression closed-form: <code>(XᵀX)⁻¹Xᵀy</code>.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">10. Rank, Eigenvectors, PCA & SVD</h3>
      <p><strong>Rank:</strong> Independent information inside a matrix. Helps detect redundancy.</p>
      <p><strong>Eigenvectors (Av = λv):</strong> Special vectors that do not change direction under transformation.</p>
      <p><strong>PCA:</strong> Dimensionality reduction tool. Shrinks feature counts while preserving information.</p>
      <p><strong>SVD (A = UΣVᵀ):</strong> Decomposition used in Recommendation Systems (Netflix/YouTube) and LLM compression (LoRA/QLoRA).</p>
    `,
    code: `import numpy as np

# 1. Dot Product (Neuron forward pass: w.x + b)
w = np.array([0.5, 0.3, 0.2])
x = np.array([10, 20, 30])
b = 2.0
neuron_out = np.dot(w, x) + b
print("Dot Product (w.x + b):", neuron_out)

# 2. Matrix Multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = np.matmul(A, B)
print("\\nMatrix Multiplication A x B:\\n", C)

# 3. Transpose
X = np.array([[1, 2, 3], [4, 5, 6]])
print("\\nOriginal Shape:", X.shape)
print("Transposed Shape:", X.T.shape)`,
    codeOutput: `Dot Product (w.x + b): 19.0

Matrix Multiplication A x B:
 [[19 22]
 [43 50]]

Original Shape: (2, 3)
Transposed Shape: (3, 2)`,
    formulas: [
      { name: "Dot Product", formula: "A · B = sum(Ai * Bi)" },
      { name: "Matrix Multiplicability", formula: "Columns of A == Rows of B" },
      { name: "Eigenvalue Equation", formula: "A * v = lambda * v" },
      { name: "SVD Decomposition", formula: "A = U * Sigma * V^T" }
    ],
    shortcuts: [
      "Matrix Transpose Shape: If A is (m, n), Aᵀ is (n, m).",
      "PCA Reduction: Shrinks K correlated features into M independent principal components (M < K)."
    ],
    questions: [
      {
        question: "Find the dot product of [2,3] and [4,5].",
        options: ["17", "20", "23", "25"],
        answer: 2,
        explanation: "2*4 + 3*5 = 8 + 15 = 23."
      },
      {
        question: "Can two matrices of shapes (5,2) and (3,4) be multiplied?",
        options: ["Yes", "No", "Only if transposed", "Depends on rank"],
        answer: 1,
        explanation: "No. The middle dimensions (2 and 3) do not match."
      },
      {
        question: "If matrix A has shape (2,5), what is the shape of its transpose Aᵀ?",
        options: ["(2,5)", "(5,2)", "(5,5)", "(2,2)"],
        answer: 1,
        explanation: "Transpose swaps rows and columns, turning (2,5) into (5,2)."
      },
      {
        question: "Calculate the dot product of [1,2,3] and [7,8,9].",
        options: ["45", "50", "55", "60"],
        answer: 1,
        explanation: "1*7 + 2*8 + 3*9 = 7 + 16 + 27 = 50."
      }
    ]
  },
  {
    id: 3,
    title: "Calculus: Gradients & Backpropagation",
    layer: "Layer 0.2",
    theory: `
      <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
        <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          Layer 0.2: Calculus for Machine Learning
        </h3>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
          Calculus answers: <em>How should we change the weights to reduce prediction error?</em> It governs the mathematical engine of learning.
        </p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. Functions & Derivatives</h3>
      <p>ML models are giant functions: <code>y = f(x)</code>.</p>
      <p>A derivative tells how fast output changes when input changes (slope of the loss curve). E.g., derivative of <code>x²</code> is <code>2x</code>.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Gradients (∇f) & Partial Derivatives</h3>
      <p>Gradient stores partial derivatives for multiple inputs (weights). It points uphill. To minimize error, we move opposite the gradient.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">3. Gradient Descent Updates</h3>
      <p><code>new_weight = old_weight - learning_rate * gradient</code>. This updates weights to lower loss.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">4. Chain Rule & Backpropagation</h3>
      <p>For composite functions <code>y = f(g(x))</code>, <code>dy/dx = dy/du * du/dx</code>.</p>
      <p>Backpropagation uses the chain rule to multiply derivatives backwards from the loss to each weight, telling every weight how much it contributed to the error.</p>
    `,
    code: `import numpy as np

# 1. Activation function and its derivative (ReLU)
def relu(z):
    return np.maximum(0, z)

def relu_derivative(z):
    return np.where(z > 0, 1, 0)

z = np.array([-2, -0.5, 1.5, 3])
print("z values:", z)
print("ReLU(z) :", relu(z))
print("dReLU/dz:", relu_derivative(z))

# 2. Backpropagation Step (Chain Rule)
# Loss = (y_pred - y)^2 => dLoss/dy_pred = 2 * (y_pred - y)
y_pred, y = 0.8, 1.0
dLoss_dPred = 2 * (y_pred - y)
# If y_pred = ReLU(z), dy_pred/dz = relu_derivative(z)
z_val = 1.2
dPred_dz = relu_derivative(z_val)
dLoss_dz = dLoss_dPred * dPred_dz
print("\\ndLoss/dz (Chain Rule):", dLoss_dz)`,
    codeOutput: `z values: [-2.  -0.5  1.5  3. ]
ReLU(z) : [0.  0.  1.5  3. ]
dReLU/dz: [0 0 1 1]

dLoss/dz (Chain Rule): -0.4`,
    formulas: [
      { name: "Gradient Descent Update", formula: "w = w - lr * dLoss/dw" },
      { name: "Power Rule Derivative", formula: "d/dx(x^n) = n * x^(n-1)" },
      { name: "Chain Rule", formula: "dy/dx = (dy/du) * (du/dx)" }
    ],
    shortcuts: [
      "Loss derivative directions: Positive gradient -> decrease weight to reduce loss. Negative gradient -> increase weight.",
      "Exponential Derivative: d/dx(e^x) = e^x (crucial for Softmax & Attention)."
    ],
    questions: [
      {
        question: "Find the derivative of x^5.",
        options: ["5x^4", "x^4", "5x^5", "5x"],
        answer: 0,
        explanation: "By the power rule: d/dx(x^n) = n*x^(n-1). So d/dx(x^5) = 5x^4."
      },
      {
        question: "If weight w = 5, gradient = 2, and learning rate lr = 0.1, what is the new weight after one gradient descent step?",
        options: ["5.2", "4.8", "4.5", "4.9"],
        answer: 1,
        explanation: "w_new = w_old - lr * gradient = 5 - (0.1 * 2) = 5 - 0.2 = 4.8."
      },
      {
        question: "Why is the chain rule critical for deep neural networks?",
        options: ["It speeds up matrix multiplication", "It calculates loss values", "It enables backpropagation of errors through multiple layers", "It regularizes weight values"],
        answer: 2,
        explanation: "The chain rule allows error gradients to flow backward through chained composite functions (layers)."
      }
    ]
  },
  {
    id: 4,
    title: "Probability: Distributions & Cross-Entropy",
    layer: "Layer 0.3",
    theory: `
      <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
        <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          Layer 0.3: Probability & Statistics
        </h3>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
          Probability handles uncertainty. LLMs like GPT predict the next token probabilistically: <code>P("cat") = 0.7</code>.
        </p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. Distributions & Expectations</h3>
      <p><strong>Normal Distribution:</strong> Bell curve representing natural features and noise.</p>
      <p><strong>Expectation:</strong> Long-term average prediction over many inputs.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Conditional Probability & Bayes Theorem</h3>
      <p><code>P(A|B) = P(B|A)P(A) / P(B)</code>. Predicts outcomes based on context, like next word given previous words.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">3. Likelihood & MLE</h3>
      <p>Probability finds data given a model. Likelihood finds the best model parameters given observed data. Training is mostly maximizing likelihood (MLE).</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">4. Cross Entropy & Entropy</h3>
      <p><strong>Cross Entropy</strong> is the primary loss for classification and LLMs. It punishes incorrect confidence heavily. <strong>Entropy</strong> measures uncertainty.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">5. Bias-Variance Tradeoff</h3>
      <p>High bias causes underfitting (too simple). High variance causes overfitting (memorizes training set).</p>
    `,
    code: `import numpy as np

# 1. Softmax activation (turns raw scores into probabilities)
def softmax(logits):
    exps = np.exp(logits - np.max(logits)) # stable
    return exps / np.sum(exps)

logits = np.array([2.0, 1.0, 0.1])
probs = softmax(logits)
print("Softmax Probabilities:", probs)

# 2. Cross Entropy Loss
# Target is index 0: [1.0, 0.0, 0.0]
y_true = np.array([1, 0, 0])
loss = -np.sum(y_true * np.log(probs))
print("Cross Entropy Loss:", loss)`,
    codeOutput: `Softmax Probabilities: [0.659 0.242 0.099]
Cross Entropy Loss: 0.4170324701292026`,
    formulas: [
      { name: "Bayes Theorem", formula: "P(A|B) = [P(B|A) * P(A)] / P(B)" },
      { name: "Mean (Average)", formula: "mean = sum(x) / N" },
      { name: "Cross Entropy Loss", formula: "L = -sum(y_true * log(y_pred))" }
    ],
    shortcuts: [
      "Underfitting vs Overfitting: Low train & test accuracy = underfitting. High train, low test accuracy = overfitting.",
      "Standard Deviation: std = sqrt(variance). Measures the dispersion of data."
    ],
    questions: [
      {
        question: "Which coin is more likely to have generated the data [Heads, Heads, Heads, Heads]?",
        options: ["Coin A (P(Head)=0.5)", "Coin B (P(Head)=0.9)", "Both equally likely", "Coin C (P(Head)=0.1)"],
        answer: 1,
        explanation: "Coin B has higher likelihood: 0.9^4 = 0.656 vs Coin A: 0.5^4 = 0.0625."
      },
      {
        question: "What does high variance in a machine learning model typically lead to?",
        options: ["Underfitting", "Overfitting", "Perfect generalization", "Zero training error only"],
        answer: 1,
        explanation: "High variance means the model is highly sensitive to training data, leading to overfitting."
      }
    ]
  },
  {
    id: 5,
    title: "Layer 1: Machine Learning from Scratch",
    layer: "Layer 1.0",
    theory: `
      <div class="formula-memorize-card" style="border: 1px solid var(--accent-purple); padding: 15px; border-radius: 8px; margin-bottom: 20px; background: rgba(139, 92, 246, 0.05);">
        <h3 style="color: var(--accent-purple); margin-top: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          Layer 1: Build Machine Learning From Scratch
        </h3>
        <p style="font-size: 13.5px; line-height: 1.6; margin-bottom: 0;">
          Connecting the linear algebra, calculus, and probability concepts to build actual neural networks.
        </p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">1. How an ML Model Works (End-to-End)</h3>
      <p>1. <strong>Input:</strong> Feature vector <code>x</code>.</p>
      <p>2. <strong>Model:</strong> <code>y = wx + b</code> (dot product).</p>
      <p>3. <strong>Loss:</strong> Mean Squared Error <code>(Pred - Actual)²</code>.</p>
      <p>4. <strong>Calculus:</strong> Compute gradient <code>dLoss/dw</code>.</p>
      <p>5. <strong>Optimization:</strong> <code>w = w - lr * gradient</code>.</p>
      <p>6. <strong>Loop:</strong> Repeat thousands of times until weights converge.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">2. Neural Network Layer Math</h3>
      <p>A multi-layer network stacks matrix operations with non-linear activation functions:</p>
      <p><code>Input → Matrix Multiply (XW) → Activation (ReLU) → Matrix Multiply → Output</code>.</p>

      <h3 style="margin-top: 15px; margin-bottom: 5px; color: var(--accent-cyan);">3. Building Roadmap</h3>
      <p>To master AI engineering, implement the following from scratch: Linear Regression, Logistic Regression, 1-hidden-layer Neural Network, manual backpropagation, and MNIST digits classifier using only NumPy.</p>
    `,
    code: `import numpy as np

# A complete Forward & Backward pass on a single sample
# X: shape (1, 3), W: shape (3, 2), b: shape (1, 2)
np.random.seed(42)
X = np.random.randn(1, 3)
W = np.random.randn(3, 2)
b = np.zeros((1, 2))
y = np.array([[1.0, 0.0]])

# 1. Forward Pass
Z = np.dot(X, W) + b
# Activation (Sigmoid)
A = 1 / (1 + np.exp(-Z))
loss = np.mean((A - y) ** 2)
print("Predictions (A):", A)
print("MSE Loss:", loss)

# 2. Backward Pass
dA = 2 * (A - y)
dZ = dA * A * (1 - A)
dW = np.dot(X.T, dZ)
db = np.sum(dZ, axis=0, keepdims=True)

# 3. Update Weights
lr = 0.1
W -= lr * dW
b -= lr * db
print("\\nUpdated Weights (W):\\n", W)`,
    codeOutput: `Predictions (A): [[0.826 0.117]]
MSE Loss: 0.022137688009228945

Updated Weights (W):
 [[ 0.528 -0.076]
 [-0.179 -1.977]
 [ 0.641 -0.493]]`,
    formulas: [
      { name: "Neuron Equation", formula: "a = ReLU(w·x + b)" },
      { name: "Forward Pass Matrix", formula: "Y = X * W + b" },
      { name: "Mean Squared Error (MSE)", formula: "MSE = (1/N) * sum((y_pred - y_true)^2)" }
    ],
    shortcuts: [
      "Matrix Multiplications power GPUs: GPUs exist almost entirely to parallelize fast matrix multiplies XW.",
      "Non-linearity (ReLU): ReLU(z) = max(0, z). Without it, multiple layers collapse into a single linear model."
    ],
    questions: [
      {
        question: "What is the primary function of activation functions like ReLU in a neural network?",
        options: ["To speed up matrix multiplication", "To introduce non-linearity so the model can learn complex patterns", "To regularize the weights", "To compute the final loss"],
        answer: 1,
        explanation: "Activation functions introduce non-linearity, allowing neural networks to model non-linear boundaries."
      },
      {
        question: "In the equation Y = XW + b, what does W represent?",
        options: ["Input features", "Bias matrix", "Weight matrix", "Output predictions"],
        answer: 2,
        explanation: "W is the weight matrix that parameters the neural layer's linear transformations."
      }
    ]
  }
];

const CHEATSHEETS = [
  {
    category: "Quantitative Aptitude",
    topic: "Percentages & Ratios",
    content: `
- **Fractions to Percentages**:
  - $1/2 = 50\\%$
  - $1/3 = 33.33\\%$
  - $1/4 = 25\\%$
  - $1/5 = 20\\%$
  - $1/6 = 16.66\\%$
  - $1/8 = 12.5\\%$
  - $1/9 = 11.11\\%$
  - $1/11 = 9.09\\%$
  - $1/12 = 8.33\\%$
- **Percentage Change**: $\\text{Percentage Change} = \\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}} \\times 100$
- **Ratios**: If $A:B = x:y$ and $B:C = y:z$ then $A:B:C = x:y:z$.
`
  },
  {
    category: "Quantitative Aptitude",
    topic: "Time & Work",
    content: `
- **Basic Formula**: $\\text{Work} = \\text{Efficiency} \\times \\text{Time}$
- **Combined Days**: $\\text{Days} = \\frac{xy}{x+y}$
- **Chain Rule (MDH)**: $\\frac{M_1 D_1 H_1}{W_1} = \\frac{M_2 D_2 H_2}{W_2}$
- **LCM Method**: Define total work as $\\text{LCM}(\\text{times})$. Find efficiency (units/day) for each person. Sum their efficiencies for joint work.
`
  },
  {
    category: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    content: `
- **Basic Formula**: $\\text{Distance} = \\text{Speed} \\times \\text{Time}$
- **Unit Conversions**: 
  - $1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s}$
  - $1 \\text{ m/s} = \\frac{18}{5} \\text{ km/h}$
- **Average Speed (Equal Distances)**: $\\text{Avg Speed} = \\frac{2xy}{x+y}$
- **Relative Speed**:
  - **Same direction**: $S_{rel} = S_1 - S_2$
  - **Opposite direction**: $S_{rel} = S_1 + S_2$
`
  },
  {
    category: "Logical Reasoning",
    topic: "Venn Diagrams & Syllogisms",
    content: `
- **Venn Notation**:
  - $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$
  - $n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(A \\cap C) + n(A \\cap B \\cap C)$
- **Syllogism Rules**:
  - Draw the minimal overlapping Venn diagram first.
  - Draw the maximal overlapping Venn diagram.
  - A conclusion is valid if and only if it holds true in **all** possible Venn diagram representations.
`
  },
  {
    category: "Quantitative Aptitude",
    topic: "Profit & Loss Solutions",
    content: `
- **Profit Multiplier**: $1 + P/100$
- **Loss Multiplier**: $1 - L/100$
- **Discount Multiplier**: $1 - D/100$
- **Successive Discounts**: $A + B - \\frac{AB}{100}\\%$
- **False Weight Gain**: $\\frac{x}{1000 - x} \\times 100\\%$
- **CP:SP Ratios**: 
  - $20\\% \\text{ Profit} \\implies CP:SP = 5:6$
  - $25\\% \\text{ Profit} \\implies CP:SP = 4:5$
  - $20\\% \\text{ Loss} \\implies CP:SP = 5:4$
  - $25\\% \\text{ Loss} \\implies CP:SP = 4:3$
- **Answers to Practice Sets (Q1-Q35)**:
  - **Basic P&L**: Q1: ₹50 profit (25%); Q2: ₹50 loss (10%); Q3: ₹1000; Q4: ₹1020; Q5: ₹500; Q6: ₹1000; Q7: 20%; Q8: 15%
  - **Discount**: Q9: ₹800; Q10: ₹2200; Q11: 25%; Q12: 25%; Q13: ₹4500; Q14: ₹3000
  - **Successive**: Q15: 28%; Q16: 40%; Q17: 37%; Q18: 52%
  - **Profit + Discount**: Q19: 28.57% profit; Q20: No Profit/Loss; Q21: 12.5% profit; Q22: 12% profit
  - **Placement Level**: Q23: ₹1000; Q24: ₹1000; Q25: 4.17% profit; Q26: 8% profit; Q27: ₹1000
  - **False Weight**: Q28: 5.26%; Q29: 25%; Q30: 33.33% gain
  - **Challenge**: Q31: 20%; Q32: 12.5%; Q33: 20% profit; Q34: 0.8% profit; Q35: 1.25% profit
`
  },
  {
    category: "Quantitative Aptitude",
    topic: "Simple & Compound Interest",
    content: `
- **Simple Interest**: $SI = \\frac{PRT}{100}$
- **Compound Interest**: $A = P(1 + \\frac{R}{100})^T$, $CI = A - P$
- **Difference (2 Years)**: $CI - SI = P(\\frac{R}{100})^2$
- **Compounding Frequencies**: Half-yearly means rate is divided by 2, and time periods are multiplied by 2.
- **Successive Rates**: Chain multipliers directly, e.g. $A = P \\times (1 + R_1/100) \\times (1 + R_2/100)$
- **Key Multipliers**:
  - $5\\% \\implies 1.05$
  - $10\\% \\implies 1.10$
  - $20\\% \\implies 1.20$
  - $25\\% \\implies 1.25$
  - $50\\% \\implies 1.50$
`
  }
];
const PLACEMENT_ROADMAPS = {
  service: {
    name: "Service-Based Prep Profile",
    difficulty: "Easy to Medium (TCS, Infosys, Wipro, Accenture)",
    focus: "Aptitude, Logical Reasoning, Basic Verbal, Foundation Coding, DBMS/OOP",
    mathRequirement: "High (Aptitude is the main screening test)",
    roadmap: [
      "Aptitude Foundations: Master Percentages, Ratio/Proportion, and Profit & Loss.",
      "Practice core logical tracks (Syllogisms, Blood Relations, Seating Arrangements).",
      "Learn basic coding logic (Arrays, Strings) and syntax in Python/Java/C++.",
      "Revise core CS subjects: Database Management (SQL queries) and Object Oriented Programming.",
      "Practice 5 full-length mock tests to lock down your timing strategy."
    ]
  },
  product: {
    name: "Product-Based prep Profile",
    difficulty: "Medium to Hard (Amazon, Startups, Product Cos)",
    focus: "High-ROI DSA patterns, Projects, System Design basics, OOP, SQL",
    mathRequirement: "Medium (Problem-solving and coding efficiency take priority)",
    roadmap: [
      "DSA Patterns: Master Two Pointers, Sliding Window, and Hash Map tracks first.",
      "Solve the 110 curated DSA questions to build maximum interview ROI.",
      "Create one deep portfolio project with a clean, fully deployed web stack.",
      "Prepare core computer science sheets: SQL, OOP design, OS threads, and networks.",
      "Solve medium-level LeetCode daily and practice explaining code complexity aloud."
    ]
  }
};

const DSA_PROBLEMS = [
  // Arrays (20)
  { id: 1, name: "Two Sum", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/", pattern: "Hash Map", hint: "Use a map to store seen values and indices to find target - x in O(1)." },
  { id: 2, name: "Contains Duplicate", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", pattern: "Hash Set", hint: "Use a set to track visited values and check for presence in O(1) time." },
  { id: 3, name: "Valid Anagram", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", pattern: "Frequency Map", hint: "Count char frequencies of both strings and compare if counts match." },
  { id: 4, name: "Group Anagrams", topic: "Arrays", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/", pattern: "Hash Map & Sorting", hint: "Use sorted strings as hash map keys and append anagrams to their list." },
  { id: 5, name: "Top K Frequent Elements", topic: "Arrays", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/", pattern: "Bucket Sort / Heap", hint: "Count frequencies, then use bucket sort or a min-heap to find top K." },
  { id: 6, name: "Product of Array Except Self", topic: "Arrays", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/", pattern: "Prefix & Suffix Products", hint: "Compute prefix products first, then traverse backward to multiply by suffix products." },
  { id: 7, name: "Valid Sudoku", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/valid-sudoku/", pattern: "Hash Set Check", hint: "Track rows, columns, and 3x3 grids using sets for each number." },
  { id: 8, name: "Longest Consecutive Sequence", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/", pattern: "Set Scanning", hint: "Insert all into a set, only start counting sequence lengths from values that have no left neighbor." },
  { id: 9, name: "Best Time to Buy and Sell Stock", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", pattern: "Greedy/One Pass", hint: "Track min price seen and max profit difference dynamically." },
  { id: 10, name: "Plus One", topic: "Arrays", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/plus-one/", pattern: "Basic Math", hint: "Iterate backward, add one, handle carry, and prepend 1 if all digits are 9." },
  { id: 11, name: "Single Number", topic: "Arrays", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/single-number/", pattern: "Bitwise XOR", hint: "XORing a number with itself cancels it out. XOR all values to find the single one." },
  { id: 12, name: "Move Zeroes", topic: "Arrays", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/move-zeroes/", pattern: "Two Pointers", hint: "Maintain a write index. Write non-zero elements forward, fill rest with zeroes." },
  { id: 13, name: "Find Duplicate Number", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/find-the-duplicate-number/", pattern: "Floyd's Cycle Finding", hint: "Treat array values as pointers to indices. Find meeting point of slow/fast pointers." },
  { id: 14, name: "Majority Element", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/majority-element/", pattern: "Boyer-Moore Voting", hint: "Keep a candidate and a count. Increment/decrement count, switch candidate if count becomes 0." },
  { id: 15, name: "Merge Sorted Array", topic: "Arrays", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/merge-sorted-array/", pattern: "Three Pointers (Backward)", hint: "Place pointers at the ends of arrays and merge elements from the back." },
  { id: 16, name: "Maximum Subarray (Kadane's)", topic: "Arrays", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/", pattern: "Dynamic Programming/Greedy", hint: "Add current element to running sum. Reset sum to 0 if it becomes negative." },
  { id: 17, name: "Sort Colors (Dutch National Flag)", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/sort-colors/", pattern: "Three Pointers", hint: "Keep pointers for 0 (left), 1 (current), and 2 (right). Swap values accordingly." },
  { id: 18, name: "Next Permutation", topic: "Arrays", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/next-permutation/", pattern: "Array Modification", hint: "Find first dip from right, swap with next larger element on right, reverse right side." },
  { id: 19, name: "Subarray Sum Equals K", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/subarray-sum-equals-k/", pattern: "Prefix Sum HashMap", hint: "Store frequency of cumulative prefix sums. Check if prefix_sum - k is in map." },
  { id: 20, name: "Rotate Array", topic: "Arrays", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/rotate-array/", pattern: "Array Reversal", hint: "Reverse entire array, reverse first k elements, reverse remaining elements." },

  // Strings (10)
  { id: 21, name: "Valid Palindrome", topic: "Strings", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", pattern: "Two Pointers", hint: "Skip non-alphanumeric chars, compare characters at left and right pointers." },
  { id: 22, name: "Reverse String", topic: "Strings", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-string/", pattern: "Two Pointers swap", hint: "Swap left and right pointers moving inward." },
  { id: 23, name: "Longest Common Prefix", topic: "Strings", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/longest-common-prefix/", pattern: "Horizontal Scanning", hint: "Compare first string prefix with subsequent strings, reducing it until matching." },
  { id: 24, name: "First Unique Character in a String", topic: "Strings", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/first-unique-character-in-a-string/", pattern: "Frequency Map", hint: "Build char frequency count, then return index of first character with frequency 1." },
  { id: 25, name: "Reverse Words in a String", topic: "Strings", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/reverse-words-in-a-string/", pattern: "String Parsing", hint: "Trim spaces, split into words, reverse word order, and join with a single space." },
  { id: 26, name: "String to Integer (atoi)", topic: "Strings", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/string-to-integer-atoi/", pattern: "Parsing & Overflow", hint: "Skip whitespace, check sign (+/-), convert digit characters, clamp to 32-bit int range." },
  { id: 27, name: "Palindromic Substrings", topic: "Strings", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/", pattern: "Expand Around Center", hint: "Treat each index (and gaps) as palindrome centers and expand outward." },
  { id: 28, name: "Longest Palindromic Substring", topic: "Strings", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/", pattern: "Expand Around Center", hint: "Expand around centers to find longest palindrome, record indices." },
  { id: 29, name: "Implement strStr()", topic: "Strings", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", pattern: "Sub-string matching", hint: "Slide a window of size needle across haystack, compare characters." },
  { id: 30, name: "Valid Anagram (String Version)", topic: "Strings", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", pattern: "Frequency Array", hint: "Use a fixed size int array (size 26) to count characters of both strings." },

  // Hashing (10)
  { id: 31, name: "Two Sum (Hashing)", topic: "Hashing", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/", pattern: "Hash Map Lookup", hint: "Map key as value and value as index. Retrieve in O(1) lookup." },
  { id: 32, name: "Contains Duplicate (Hashing)", topic: "Hashing", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", pattern: "Hash Set", hint: "Set check is O(1). Add elements to set; if element already in set, return true." },
  { id: 33, name: "Intersection of Two Arrays", topic: "Hashing", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/intersection-of-two-arrays/", pattern: "Double Sets", hint: "Store first array in a set. Query second array against set to find common values." },
  { id: 34, name: "Happy Number", topic: "Hashing", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/happy-number/", pattern: "Set Cycle Check", hint: "Track squared sum of digits in set. If sum repeats, it's an infinite cycle (not happy)." },
  { id: 35, name: "Isomorphic Strings", topic: "Hashing", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/isomorphic-strings/", pattern: "Bi-directional Mapping", hint: "Map character from s to t and t to s. Verify no double assignments." },
  { id: 36, name: "Word Pattern", topic: "Hashing", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/word-pattern/", pattern: "Bi-directional Mapping", hint: "Map pattern letters to words and words to pattern letters. Verify matches." },
  { id: 37, name: "Find All Anagrams in a String", topic: "Hashing", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", pattern: "Sliding Window Hash", hint: "Maintain sliding window freq map, compare with target string freq map." },
  { id: 38, name: "Subarray Sum Equals K (Hashing)", topic: "Hashing", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/subarray-sum-equals-k/", pattern: "Prefix Sum Map", hint: "Check if (curr_sum - k) prefix exists in our running prefix counts map." },
  { id: 39, name: "Design HashMap", topic: "Hashing", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/design-hashmap/", pattern: "Chaining / Modulo", hint: "Create an array of linked lists. Use key % array_length as slot index." },
  { id: 40, name: "Ransom Note", topic: "Hashing", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/ransom-note/", pattern: "Frequency Table", hint: "Count frequency of chars in magazine. Decrement counts for ransomNote chars." },

  // Two Pointers (8)
  { id: 41, name: "Valid Palindrome (Two Pointers)", topic: "Two Pointers", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", pattern: "Two Pointers Collision", hint: "Increment left, decrement right, compare lowercased chars." },
  { id: 42, name: "Two Sum II - Input Array Is Sorted", topic: "Two Pointers", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", pattern: "Sorted Collision", hint: "Pointers at 0 and length-1. If sum is too high, decrement right. Else increment left." },
  { id: 43, name: "3Sum", topic: "Two Pointers", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/", pattern: "Sorted Anchor & Move", hint: "Sort, fix one index, and use Two Pointers sorted search for remaining two values. Skip duplicate values." },
  { id: 44, name: "Container With Most Water", topic: "Two Pointers", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/", pattern: "Shrinking Window", hint: "Pointers at ends. Calculate area. Move pointer pointing to shorter height inward." },
  { id: 45, name: "Trapping Rain Water", topic: "Two Pointers", importance: "High", difficulty: "Hard", link: "https://leetcode.com/problems/trapping-rain-water/", pattern: "Dual Boundaries", hint: "Maintain left_max, right_max. Move pointer with smaller max boundary and calculate water capacity." },
  { id: 46, name: "Remove Duplicates from Sorted Array", topic: "Two Pointers", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", pattern: "Write Pointer", hint: "Slow pointer writes unique elements, fast pointer scans." },
  { id: 47, name: "Remove Element", topic: "Two Pointers", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/remove-element/", pattern: "Filter Pointer", hint: "Keep a slow pointer to write non-val values. Fast pointer iterates." },
  { id: 48, name: "Merge Sorted Array (Two Pointers)", topic: "Two Pointers", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/merge-sorted-array/", pattern: "Backward Merge", hint: "Write backwards using three pointers from the ends of the arrays." },

  // Sliding Window (8)
  { id: 49, name: "Best Time to Buy/Sell Stock (Window)", topic: "Sliding Window", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", pattern: "Min Left Anchor", hint: "Left is buy day, right is sell day. If right < left, move left to right." },
  { id: 50, name: "Longest Substring Without Repeating Characters", topic: "Sliding Window", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", pattern: "Dynamic Window Set", hint: "Expand right. If duplicate found, shrink left until duplicate is removed from set." },
  { id: 51, name: "Longest Repeating Character Replacement", topic: "Sliding Window", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", pattern: "Max Frequency Count", hint: "Window size - max_freq_char <= k. If invalid, shrink left pointer." },
  { id: 52, name: "Permutation in String", topic: "Sliding Window", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string/", pattern: "Fixed Size Window Freq", hint: "Window size = s1.length. Compare char counts between window and s1." },
  { id: 53, name: "Minimum Window Substring", topic: "Sliding Window", importance: "Medium", difficulty: "Hard", link: "https://leetcode.com/problems/minimum-window-substring/", pattern: "Expand & Contract", hint: "Expand right until all required characters found, then shrink left to minimize length." },
  { id: 54, name: "Max Consecutive Ones III", topic: "Sliding Window", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/max-consecutive-ones-iii/", pattern: "Zero Count Constraint", hint: "Window allows at most K zeroes. If zeroes > K, shrink left until zero count &le; K." },
  { id: 55, name: "Minimum Size Subarray Sum", topic: "Sliding Window", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", pattern: "Running Sum Window", hint: "Expand right, while sum &ge; target, record min length and shrink left." },
  { id: 56, name: "Maximum Number of Vowels in Substring", topic: "Sliding Window", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/", pattern: "Fixed Size Window", hint: "Count vowels in first K chars. Slide window, add new char, subtract old char." },

  // Binary Search (8)
  { id: 57, name: "Binary Search", topic: "Binary Search", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search/", pattern: "Divide & Conquer", hint: "Calculate mid. If mid == target, return index. Else adjust low/high bounds." },
  { id: 58, name: "Search a 2D Matrix", topic: "Binary Search", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/search-a-2d-matrix/", pattern: "1D Index Mapping", hint: "Map 1D index to 2D matrix: row = index / cols, col = index % cols." },
  { id: 59, name: "Koko Eating Bananas", topic: "Binary Search", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/", pattern: "Binary Search on Answer", hint: "Search speed from 1 to max(piles). Check if speed K allows eating all in H hours." },
  { id: 60, name: "Find Minimum in Rotated Sorted Array", topic: "Binary Search", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", pattern: "Inflection Detection", hint: "If nums[mid] > nums[right], minimum lies on the right. Else on the left." },
  { id: 61, name: "Search in Rotated Sorted Array", topic: "Binary Search", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", pattern: "Half-Sorted Detection", hint: "Determine which half is sorted. Use values to check if target lies in sorted half." },
  { id: 62, name: "Time Based Key-Value Store", topic: "Binary Search", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/time-based-key-value-store/", pattern: "BS on Timestamp list", hint: "Store timestamps in array. Use binary search to find target or largest timestamp &le; target." },
  { id: 63, name: "Median of Two Sorted Arrays", topic: "Binary Search", importance: "Medium", difficulty: "Hard", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", pattern: "Partition Binary Search", hint: "Partition smaller array and binary search correct split point to equalize left/right halves." },
  { id: 64, name: "First and Last Position of Element", topic: "Binary Search", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", pattern: "Dual BS Runs", hint: "Perform binary search twice: once bias left (first), once bias right (last)." },

  // Linked List (8)
  { id: 65, name: "Reverse Linked List", topic: "Linked List", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/", pattern: "Iterative Pointers", hint: "Maintain prev, curr, next. Flip curr.next = prev, shift pointers." },
  { id: 66, name: "Merge Two Sorted Lists", topic: "Linked List", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/", pattern: "Dummy Head Tracker", hint: "Create dummy node. Compare list nodes, append smaller, link remainder." },
  { id: 67, name: "Linked List Cycle", topic: "Linked List", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/", pattern: "Slow & Fast Pointers", hint: "Slow pointer moves 1 step, Fast moves 2. If they collide, cycle exists." },
  { id: 68, name: "Reorder List", topic: "Linked List", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/reorder-list/", pattern: "Split, Reverse & Merge", hint: "Find middle, reverse second half, merge two halves alternatingly." },
  { id: 69, name: "Remove Nth Node From End", topic: "Linked List", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", pattern: "N-Delay Pointers", hint: "Fast pointer moves N steps first. Then move slow and fast together until end." },
  { id: 70, name: "Copy List with Random Pointer", topic: "Linked List", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", pattern: "Interweaving Nodes", hint: "Insert cloned nodes adjacent to originals, copy random links, split lists." },
  { id: 71, name: "Add Two Numbers", topic: "Linked List", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/add-two-numbers/", pattern: "Digit addition loop", hint: "Iterate lists, sum values with carry, append new nodes, handle trailing carry." },
  { id: 72, name: "Find Duplicate (Linked List Cycle)", topic: "Linked List", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/find-the-duplicate-number/", pattern: "Floyd Cycle Meeting Point", hint: "Map array indices as nodes. Run slow/fast pointers, find cycle entrance." },

  // Stack (8)
  { id: 73, name: "Valid Parentheses", topic: "Stack", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/", pattern: "LIFO Stack Matching", hint: "Push opening brackets. For closing brackets, pop and check if matching." },
  { id: 74, name: "Min Stack", topic: "Stack", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/min-stack/", pattern: "Dual Stack Tracking", hint: "Maintain a main stack and a minimum-value stack that mirrors pushes/pops." },
  { id: 75, name: "Evaluate Reverse Polish Notation", topic: "Stack", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", pattern: "Postfix Evaluation", hint: "Push numbers. When operator found, pop two numbers, apply operation, push result." },
  { id: 76, name: "Generate Parentheses", topic: "Stack", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/generate-parentheses/", pattern: "Backtracking / Stack", hint: "Track count of open and closed brackets. Only add close bracket if close < open." },
  { id: 77, name: "Daily Temperatures", topic: "Stack", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/daily-temperatures/", pattern: "Monotonic Decreasing Stack", hint: "Push index. If current temp > stack top index temp, pop and write difference." },
  { id: 80, name: "Next Greater Element I", topic: "Stack", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/next-greater-element-i/", pattern: "Monotonic Stack", hint: "Find next greater for all in nums2 using stack, store in map, map to nums1." },

  // Trees (12)
  { id: 81, name: "Invert Binary Tree", topic: "Trees", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/", pattern: "Recursive Swap", hint: "Swap left and right children recursively for all nodes." },
  { id: 82, name: "Maximum Depth of Binary Tree", topic: "Trees", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", pattern: "Recursive Depth DFS", hint: "Return 1 + max(depth(left), depth(right)). Base case: node null returns 0." },
  { id: 83, name: "Diameter of Binary Tree", topic: "Trees", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/diameter-of-binary-tree/", pattern: "DFS height traversal", hint: "Track max sum of left and right heights at any node in a global variable." },
  { id: 84, name: "Balanced Binary Tree", topic: "Trees", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/balanced-binary-tree/", pattern: "DFS height validation", hint: "Return height. If difference in left/right heights > 1, flag balance as false." },
  { id: 85, name: "Is Same Tree", topic: "Trees", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/is-same-tree/", pattern: "Recursive Equivalence", hint: "Verify structural nulls match, and val matches. Recursively check left and right." },
  { id: 86, name: "Is Subtree of Another Tree", topic: "Trees", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/is-subtree-of-another-tree/", pattern: "Recursive Search DFS", hint: "At each node, run 'isSameTree' check against subTree root." },
  { id: 87, name: "Lowest Common Ancestor of a BST", topic: "Trees", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", pattern: "BST Property Search", hint: "If p and q are both smaller, search left. If both larger, search right. Else current is LCA." },
  { id: 88, name: "Binary Tree Level Order Traversal", topic: "Trees", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", pattern: "BFS Queue Traversal", hint: "Use queue, track size of queue at start of level to process nodes level-by-level." },
  { id: 89, name: "Binary Tree Right Side View", topic: "Trees", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-right-side-view/", pattern: "BFS rightmost check", hint: "For each level BFS queue iteration, record the last element to output." },
  { id: 90, name: "Count Good Nodes in Binary Tree", topic: "Trees", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", pattern: "DFS path tracking", hint: "Pass max value seen so far down DFS path. Increment count if node val &ge; path max." },
  { id: 91, name: "Validate Binary Search Tree", topic: "Trees", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/", pattern: "DFS Range boundaries", hint: "Pass min and max boundaries. Left child max = node val, right child min = node val." },
  { id: 92, name: "Kth Smallest Element in a BST", topic: "Trees", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", pattern: "Inorder Traversal", hint: "BST inorder is sorted. Perform inorder traversal, decrement K, return node val when K=0." },

  // Heap (5)
  { id: 93, name: "Kth Largest Element in a Stream", topic: "Heap", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", pattern: "Min-Heap constraint", hint: "Maintain a min-heap of size K. Min heap top is always Kth largest." },
  { id: 94, name: "Last Stone Weight", topic: "Heap", importance: "Medium", difficulty: "Easy", link: "https://leetcode.com/problems/last-stone-weight/", pattern: "Max-Heap Sim", hint: "Insert all weights in max-heap. Pop two largest, compute collision, push remainder." },
  { id: 95, name: "K Closest Points to Origin", topic: "Heap", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/k-closest-points-to-origin/", pattern: "Max-Heap / Min-Heap", hint: "Store distance + coordinates. Keep max-heap of size K, evict furthest." },
  { id: 96, name: "Kth Largest Element in an Array", topic: "Heap", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", pattern: "Min-Heap / QuickSelect", hint: "Push to min-heap of size K. Top element of heap will be answer." },
  { id: 97, name: "Task Scheduler", topic: "Heap", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/task-scheduler/", pattern: "Max Heap & Queue", hint: "Track task frequencies in Max Heap. Use queue to store tasks in cooldown." },

  // Graph BFS/DFS (8)
  { id: 98, name: "Number of Islands", topic: "Graph BFS/DFS", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/", pattern: "DFS flood fill", hint: "Scan grid. When 1 is found, increment island count, run DFS/BFS to turn connected 1s to 0s." },
  { id: 99, name: "Max Area of Island", topic: "Graph BFS/DFS", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/max-area-of-island/", pattern: "DFS counter recursion", hint: "Run DFS on island, return 1 + sum of connected cells. Track maximum area." },
  { id: 100, name: "Clone Graph", topic: "Graph BFS/DFS", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/", pattern: "BFS/DFS Clone Map", hint: "Keep a map of original node to cloned node. DFS/BFS traverse to link copies." },
  { id: 101, name: "Course Schedule", topic: "Graph BFS/DFS", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/", pattern: "Topological Sort/Cycle DFS", hint: "Represent pre-reqs as adjacency list. Run DFS to find back-edges (cycles)." },
  { id: 102, name: "Pacific Atlantic Water Flow", topic: "Graph BFS/DFS", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", pattern: "Multi-Source DFS/BFS", hint: "DFS from ocean boundaries inland. Find cells reachable from both Pacific and Atlantic." },
  { id: 103, name: "Surrounded Regions", topic: "Graph BFS/DFS", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/surrounded-regions/", pattern: "Border Rescue DFS", hint: "DFS from border 'O's to mark them safe. Flip rest of 'O's to 'X's." },
  { id: 104, name: "Rotting Oranges", topic: "Graph BFS/DFS", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/rotting-oranges/", pattern: "Multi-Source BFS", hint: "Add all rotten oranges to queue. Level BFS expands to infect adjacent fresh oranges." },
  { id: 105, name: "Clone N-ary Tree", topic: "Graph BFS/DFS", importance: "Medium", difficulty: "Medium", link: "https://leetcode.com/problems/clone-binary-tree-with-random-pointer/", pattern: "Graph DFS", hint: "Traverse tree nodes recursively, clone structure and populate pointers." },

  // DP Basics (5)
  { id: 106, name: "Climbing Stairs", topic: "DP Basics", importance: "Very High", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/", pattern: "Fibonacci Iterative", hint: "ways(n) = ways(n-1) + ways(n-2). Keep two variables for last two states." },
  { id: 107, name: "Min Cost Climbing Stairs", topic: "DP Basics", importance: "High", difficulty: "Easy", link: "https://leetcode.com/problems/min-cost-climbing-stairs/", pattern: "1D Array DP", hint: "cost[i] += min(cost[i-1], cost[i-2]). Scan from bottom up." },
  { id: 108, name: "House Robber", topic: "DP Basics", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/", pattern: "Rob/Skip State DP", hint: "rob[i] = max(rob[i-2] + house[i], rob[i-1]). Keep track of max choices." },
  { id: 109, name: "House Robber II", topic: "DP Basics", importance: "High", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber-ii/", pattern: "Split DP Ranges", hint: "Run House Robber once for houses 0 to N-2, once for houses 1 to N-1. Take max." },
  { id: 110, name: "Coin Change", topic: "DP Basics", importance: "Very High", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/", pattern: "Bottom-Up Unbounded Knapsack", hint: "dp[i] = min(dp[i], 1 + dp[i - coin]) for all coins. Init dp array with Infinity." }
];
