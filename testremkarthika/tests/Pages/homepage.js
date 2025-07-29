export class homepage {
    constructor(page) {

        // Dasboard page
        this.page = page;
        this.dashboard = page.locator("//h2[contains(text(), 'Dashboard')]");
        this.addProduct = page.locator("//button[@type = 'button']/span[text() = 'Add Product']");
        this.logOut = page.locator("//button[@type = 'button']/span[text() = 'Log Out']");
        this.search = page.locator("//input[@placeholder = 'Search by product name']");


        // seach a not present product
        this.searchNoproductError = page.locator("//div[contains(@class, 'swal-text') and text() = 'There is no product!']");
        this.searchCrossMark = page.locator("//div[contains(@class, 'swal-icon--error__x-mark')]");
        this.SeachErrorOkButton = page.locator("//button[contains(@class, 'swal-button swal-button--confirm') and text() = 'OK']");

        // Add product popup - alert box
        this.addProductHeader = page.locator("//h2[contains(text(), 'Add Product')]");
        this.productName = page.locator("//input[@placeholder = 'Product Name']");
        this.productDescription = page.locator("//input[@placeholder = 'Description']");
        this.productPrice = page.locator("//input[@placeholder = 'Price']");
        this.productDiscount = page.locator("//input[@placeholder = 'Discount']");
        this.productUploadButton = page.locator("//span[contains(@class, 'MuiButton-label') and text() = ' Upload']");
        this.cancelButton = page.locator("//span[contains(@class, 'MuiButton-label') and text() = 'Cancel']");
        this.addProductButton = page.locator("(//button/span[text() = 'Add Product'])[2]");

        //Edit product popup
        this.editProductHeader = page.locator("//h2[contains(text(), 'Edit Product')]");
        this.editProductName = page.locator("//input[@placeholder = 'Product Name']");
        this.editProductDescription = page.locator("//input[@placeholder = 'Description']");
        this.editProductPrice = page.locator("//input[@placeholder = 'Price']");
        this.editProductDiscount = page.locator("//input[@placeholder = 'Discount']");
        this.editProductUploadFileName = page.locator("//label");
        this.editProductUploadButton = page.locator("//span[contains(@class, 'MuiButton-label') and text() = ' Upload']");
        this.editCancelButton = page.locator("//span[contains(@class, 'MuiButton-label') and text() = 'Cancel']");
        this.editProductButton = page.locator("//button/span[text() = 'Edit Product']");


        // Add Product popup - Alert
        this.productAddedPRight = page.locator("//div[contains(@class, 'swal-icon--success__ring')]");
        this.productAddedPText = page.locator("//div[text()='Product Added successfully.']");
        this.okButton = page.locator("//button[text()='OK']");

        // Edit Product popup - Alert
        this.productEditedPRight = page.locator("//div[contains(@class, 'swal-icon--success__ring')]");
        this.productEditedPText = page.locator("//div[text()='Product updated.']");
        this.okButton = page.locator("//button[text()='OK']");

        //Delete product popup - Alert
        this.productDeleatedRight = page.locator("//div[contains(@class, 'swal-icon--success__ring')]");
        this.productDeleatedText = page.locator("//div[text()='Product deleted.']");
        this.okButton = page.locator("//button[text()='OK']");

        //Pagination
        this.nextPageButton = page.locator("//button[@aria-label ='Go to next page']");
        this.beforePageButton = page.locator("//button[@aria-label ='Go to previous page']");


        // Table body , all the existing rows available 


        // Column Headers
        this.itemName = page.locator("//th[text() = 'Name']");
        this.itemImage = page.locator("//th[text() = 'Image']");
        this.itemDescription = page.locator("//th[text() = 'Description']");
        this.itemPrice = page.locator("//th[text() = 'Price']");
        this.itemDiscount = page.locator("//th[text() = 'Discount']");
        this.itemAction = page.locator("//th[text() = 'Action']");

        // Row elements in body
        this.allRowElementsData = page.locator("//table[@aria-label='simple table']//tbody/tr");

        // Buttons inside table body 
        this.rowEditButton_1stRow = page.locator("(//span[contains(@class, 'MuiButton-label') and text() = 'Edit'])[1]");
        this.rowDeleteButton_1stRow = page.locator("(//span[contains(@class, 'MuiButton-label') and text() = 'Delete'])[1]");
        // retrieves rows from table
        this.tableRows = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');

        // Elements in 1 row Need to Write values - Not completed
        //(//th[contains(@class, 'MuiTableCell-root') and contains(@class, 'MuiTableCell-body') and
        //  contains(@class, 'MuiTableCell-alignCenter') and @role='cell' and @scope='row'])[1]
        this.rowNameValue = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');
        this.rowImageValue = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');
        this.rowDescriptionValue = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');
        this.rowPriceValue = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');
        this.rowDiscountValue = page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');


    }
}