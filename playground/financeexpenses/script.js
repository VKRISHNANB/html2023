document.addEventListener("DOMContentLoaded", function() {
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const ctx = document.getElementById("expense-chart").getContext("2d");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let chartInstance;

    function updateExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement("div");
            expenseItem.className = "expense-item";
            expenseItem.innerHTML = `
                ${expense.name} - ₹${expense.amount.toFixed(2)}
                <button onclick="removeExpense(${index})">Remove</button>
            `;
            expenseList.appendChild(expenseItem);
        });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateChart();

    }

    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newExpense = {
            name: expenseName.value,
            amount: parseFloat(expenseAmount.value)
        };
        expenses.push(newExpense);
        updateExpenses();
        expenseForm.reset();
    });

    window.removeExpense = function(index) {
        expenses.splice(index, 1);
        updateExpenses();
    };

    function updateChart() {
        const labels = expenses.map(expense => expense.name);
        const data = expenses.map(expense => expense.amount);
        if (chartInstance) { chartInstance.destroy(); }
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expenses',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateExpenses();
});
