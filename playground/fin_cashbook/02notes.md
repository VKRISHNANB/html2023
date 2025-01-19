

I'll add a receipt tracking feature to the dashboard with the ability to store receipt details and analyze spending patterns based on receipts.



```html
<!DOCTYPE html>
<html>
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto;
        }

        body {
            padding: 20px;
            background: #f0f2f5;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .header-buttons {
            display: flex;
            gap: 10px;
        }

        .balance-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .transactions, .receipts {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .transaction-list, .receipt-list {
            max-height: 400px;
            overflow-y: auto;
        }

        .transaction-item, .receipt-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }

        .receipt-item {
            cursor: pointer;
        }

        .receipt-item:hover {
            background: #f8f9fa;
        }

        .expense {
            color: #dc2626;
        }

        .income {
            color: #059669;
        }

        button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #2563eb;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            margin: 50px auto;
        }

        input, select, textarea {
            width: 100%;
            padding: 8px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .chart-container {
            height: 300px;
            margin-top: 20px;
        }

        .tab-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .tab {
            padding: 10px 20px;
            border: none;
            background: #e5e7eb;
            cursor: pointer;
        }

        .tab.active {
            background: #3b82f6;
            color: white;
        }

        .receipt-details {
            margin-top: 10px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>Finance Dashboard</h1>
            <div class="header-buttons">
                <button onclick="openReceiptModal()">Add Receipt</button>
                <button onclick="openTransactionModal()">Add Transaction</button>
            </div>
        </div>

        <div class="balance-card">
            <h2>Total Balance</h2>
            <h1 id="totalBalance">$0.00</h1>
        </div>

        <div class="cards-container">
            <div class="card">
                <h3>Income</h3>
                <p id="totalIncome">$0.00</p>
            </div>
            <div class="card">
                <h3>Expenses</h3>
                <p id="totalExpenses">$0.00</p>
            </div>
            <div class="card">
                <h3>Receipts Total</h3>
                <p id="receiptTotal">$0.00</p>
            </div>
        </div>

        <div class="tab-container">
            <button class="tab active" onclick="showChart('spending')">Spending Pattern</button>
            <button class="tab" onclick="showChart('receipts')">Receipt Pattern</button>
        </div>

        <div class="card">
            <div id="spendingChartContainer" class="chart-container">
                <canvas id="spendingChart"></canvas>
            </div>
            <div id="receiptChartContainer" class="chart-container" style="display: none;">
                <canvas id="receiptChart"></canvas>
            </div>
        </div>

        <div class="receipts">
            <h3>Recent Receipts</h3>
            <div id="receiptList" class="receipt-list"></div>
        </div>

        <div class="transactions">
            <h3>Recent Transactions</h3>
            <div id="transactionList" class="transaction-list"></div>
        </div>
    </div>

    <div id="transactionModal" class="modal">
        <div class="modal-content">
            <h2>Add Transaction</h2>
            <form id="transactionForm">
                <input type="text" id="description" placeholder="Description" required>
                <input type="number" id="amount" placeholder="Amount" step="0.01" required>
                <select id="type" required>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select id="category" required>
                    <option value="salary">Salary</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit">Add</button>
                <button type="button" onclick="closeModal('transactionModal')">Cancel</button>
            </form>
        </div>
    </div>

    <div id="receiptModal" class="modal">
        <div class="modal-content">
            <h2>Add Receipt</h2>
            <form id="receiptForm">
                <input type="text" id="merchantName" placeholder="Merchant Name" required>
                <input type="number" id="receiptAmount" placeholder="Amount" step="0.01" required>
                <input type="date" id="receiptDate" required>
                <select id="receiptCategory" required>
                    <option value="groceries">Groceries</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="shopping">Shopping</option>
                    <option value="utilities">Utilities</option>
                    <option value="transport">Transport</option>
                    <option value="other">Other</option>
                </select>
                <textarea id="receiptItems" placeholder="Items (one per line)" rows="4"></textarea>
                <textarea id="notes" placeholder="Additional Notes" rows="2"></textarea>
                <button type="submit">Add Receipt</button>
                <button type="button" onclick="closeModal('receiptModal')">Cancel</button>
            </form>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <script>
        // Initialize data from localStorage or set defaults
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let receipts = JSON.parse(localStorage.getItem('receipts')) || [];

        // DOM Elements
        const totalBalanceEl = document.getElementById('totalBalance');
        const totalIncomeEl = document.getElementById('totalIncome');
        const totalExpensesEl = document.getElementById('totalExpenses');
        const receiptTotalEl = document.getElementById('receiptTotal');
        const transactionListEl = document.getElementById('transactionList');
        const receiptListEl = document.getElementById('receiptList');
        const transactionModal = document.getElementById('transactionModal');
        const receiptModal = document.getElementById('receiptModal');
        const transactionForm = document.getElementById('transactionForm');
        const receiptForm = document.getElementById('receiptForm');

        // Charts
        let spendingChart;
        let receiptChart;

        function initializeCharts() {
            const spendingCtx = document.getElementById('spendingChart').getContext('2d');
            const receiptCtx = document.getElementById('receiptChart').getContext('2d');

            // Spending Chart
            if (spendingChart) {
                spendingChart.destroy();
            }

            const categories = ['food', 'transport', 'utilities', 'entertainment', 'other'];
            const categoryTotals = categories.map(category => {
                return transactions
                    .filter(t => t.category === category && t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0);
            });

            spendingChart = new Chart(spendingCtx, {
                type: 'doughnut',
                data: {
                    labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
                    datasets: [{
                        data: categoryTotals,
                        backgroundColor: [
                            '#ef4444',
                            '#f59e0b',
                            '#10b981',
                            '#3b82f6',
                            '#8b5cf6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Receipt Chart
            if (receiptChart) {
                receiptChart.destroy();
            }

            const receiptCategories = ['groceries', 'restaurant', 'shopping', 'utilities', 'transport', 'other'];
            const receiptTotals = receiptCategories.map(category => {
                return receipts
                    .filter(r => r.category === category)
                    .reduce((sum, r) => sum + r.amount, 0);
            });

            receiptChart = new Chart(receiptCtx, {
                type: 'doughnut',
                data: {
                    labels: receiptCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
                    datasets: [{
                        data: receiptTotals,
                        backgroundColor: [
                            '#ef4444',
                            '#f59e0b',
                            '#10b981',
                            '#3b82f6',
                            '#8b5cf6',
                            '#ec4899'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        function updateDashboard() {
            const totalIncome = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);

            const totalExpenses = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);

            const receiptTotal = receipts
                .reduce((sum, r) => sum + r.amount, 0);

            const balance = totalIncome - totalExpenses;

            totalBalanceEl.textContent = `$${balance.toFixed(2)}`;
            totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
            totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
            receiptTotalEl.textContent = `$${receiptTotal.toFixed(2)}`;

            // Update transaction list
            transactionListEl.innerHTML = transactions
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
                .map(t => `
                    <div class="transaction-item">
                        <div>
                            <strong>${t.description}</strong>
                            <div>${new Date(t.timestamp).toLocaleDateString()}</div>
                            <div>${t.category}</div>
                        </div>
                        <div class="${t.type}">
                            ${t.type === 'expense' ? '-' : '+'}$${t.amount.toFixed(2)}
                        </div>
                    </div>
                `)
                .join('');

            // Update receipt list
            receiptListEl.innerHTML = receipts
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(r => `
                    <div class="receipt-item" onclick="toggleReceiptDetails(this)">
                        <div>
                            <strong>${r.merchantName}</strong>
                            <div>${new Date(r.date).toLocaleDateString()}</div>
                            <div>${r.category}</div>
                            <div class="receipt-details" style="display: none;">
                                <strong>Items:</strong>
                                <pre>${r.items}</pre>
                                <strong>Notes:</strong>
                                <p>${r.notes}</p>
                            </div>
                        </div>
                        <div class="expense">
                            -$${r.amount.toFixed(2)}
                        </div>
                    </div>
                `)
                .join('');

            initializeCharts();
            
            // Save to localStorage
            localStorage.setItem('transactions', JSON.stringify(transactions));
            localStorage.setItem('receipts', JSON.stringify(receipts));
        }

        function openTransactionModal() {
            transactionModal.style.display = 'block';
        }

        function openReceiptModal() {
            receiptModal.style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            if (modalId === 'transactionModal') {
                transactionForm.reset();
            } else {
                receiptForm.reset();
            }
        }

        function toggleReceiptDetails(element) {
            const details = element.querySelector('.receipt-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        }

        function showChart(type) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');

            const spendingContainer = 
```