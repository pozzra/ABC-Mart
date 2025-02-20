document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("tbody");
  const taxDisplay = document.querySelector(".total-tax .td-result");
  const paymentDisplay = document.querySelector(
    ".total-tax tr:nth-child(2) .td-result"
  );
  const DISCOUNT_RATE = 0.07;
  const TAX_RATE = 0.05;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let totalAmount = 0;

    document.querySelectorAll(".form-container").forEach((container, index) => {
      const product = container.querySelector("select").value;
      const quantity =
        parseFloat(container.querySelector("input[type=number]").value) || 0;
      const price =
        parseFloat(container.querySelector("input[type=text]").value) || 0;

      if (product !== "Please choose one" && quantity > 0 && price > 0) {
        const amount = quantity * price;
        const discount = amount * DISCOUNT_RATE;
        const finalAmount = amount - discount;
        totalAmount += finalAmount;

        const row = `<tr>
              <td>${index + 1}</td>
              <td>${product}</td>
              <td>${quantity}</td>
              <td>$${price.toFixed(2)}</td>
              <td>$${discount.toFixed(2)}</td>
              <td>$${finalAmount.toFixed(2)}</td>
            </tr>`;
        tableBody.innerHTML += row;
      }
    });

    const tax = totalAmount * TAX_RATE;
    const finalPayment = totalAmount + tax;

    taxDisplay.textContent = `${(TAX_RATE * 100).toFixed(0)}% ($${tax.toFixed(
      2
    )})`;
    paymentDisplay.textContent = `$${finalPayment.toFixed(2)}`;
  });

  form.addEventListener("reset", function () {
    tableBody.innerHTML = "";
    taxDisplay.textContent = "%";
    paymentDisplay.textContent = "$";
  });
});
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}
// Function to generate PDF
function PrintPage() {
  let printContent = document.querySelector(".form-result").innerHTML; // Select only the content to print
  let originalContent = document.body.innerHTML; // Save original page content
  let hiddenIcons = document.querySelectorAll(".image-excel, .image-excel img");

  // Hide print icon and other elements before printing
  hiddenIcons.forEach((icon) => (icon.style.display = "none"));

  document.body.innerHTML = `
      <h2 style="text-align:center; color: red;   background: #007bff;">ABC Mart - Sales Report</h2>
      ${printContent}
  `; // Replace page content with the table for printing

  window.print(); // Open print dialog

  // Restore original content after printing
  document.body.innerHTML = originalContent;

  // Ensure icons are shown again after printing
  hiddenIcons.forEach((icon) => (icon.style.display = ""));
}

// Function to export to Excel
function ToEnxcel() {
  let table = document.querySelector("table");
  let ws = XLSX.utils.table_to_sheet(table);
  let wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
  XLSX.writeFile(wb, "sales_report.xlsx");
}
