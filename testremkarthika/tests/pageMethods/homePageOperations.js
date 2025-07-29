import { loginpage } from '../Pages/loginpage.js';
import { homepage } from '../Pages/homepage.js';
import { registerpage } from '../Pages/registerpage.js';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export class homePageOperations {
    constructor(page) {
        this.page = page;
        this.attach = null;
        this.homePage = new homepage(page);
        this.loginPage = new loginpage(page);
        this.registerPage = new registerpage(page);
    }


    async validateInHomePage() {
        try {
            await expect(this.homePage.dashboard).toBeVisible();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in validateInHomePage:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async getTableData() {
        try {
            const headers = ['Name', 'Image', 'Description', 'Price', 'Discount', 'Action'];
            const tableData = [];

            while (true) {
                await this.page.waitForSelector('table tbody tr', { timeout: 10000 });

                // Scroll to load all rows (if needed)
                await this.page.evaluate(() => {
                    const tbody = document.querySelector('table tbody');
                    if (tbody) tbody.scrollTo({ top: tbody.scrollHeight });
                });
                await this.page.waitForTimeout(500);

                const rowLocator = this.page.locator('table tbody tr');
                const rowCount = await rowLocator.count();

                for (let i = 0; i < rowCount; i++) {
                    const row = rowLocator.nth(i);
                    await row.scrollIntoViewIfNeeded(); // force row render if virtual scroll
                    const thText = await row.locator('th').first().innerText();
                    const tdCount = await row.locator('td').count();
                    const cells = [thText];

                    for (let j = 0; j < tdCount; j++) {
                        const td = row.locator('td').nth(j);
                        const img = td.locator('img');
                        const hasImg = await img.count();

                        if (hasImg > 0) {
                            const src = await img.getAttribute('src');
                            cells.push(src || '');
                        } else {
                            const text = await td.innerText();
                            cells.push(text.trim());
                        }
                    }

                    const rowObject = { RowNumber: tableData.length + 1 };
                    headers.forEach((header, index) => {
                        rowObject[header] = cells[index] || '';
                    });

                    tableData.push(rowObject);
                }

                // Check for next page
                const hasNext = await this.homePage.nextPageButton.count();
                const isDisabled = hasNext ? await this.homePage.nextPageButton.isDisabled() : true;

                if (!hasNext || isDisabled) break;

                const oldFirstRow = await this.page.locator('table tbody tr').first().innerText();

                await Promise.all([
                    this.homePage.nextPageButton.click(),
                    this.page.waitForFunction(
                        (prevText) => {
                            const row = document.querySelector('table tbody tr');
                            return row && row.innerText.trim() !== prevText.trim();
                        },
                        oldFirstRow,
                        { timeout: 10000 }
                    )
                ]);
            }

            return tableData;

        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in getTableData:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');
            }
            throw error;
        }
    }


    async clickAddProduct() {
        try {
            await this.homePage.addProduct.click();
            await expect(this.homePage.addProductHeader).toBeVisible();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickAddProduct:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetails() {
        try {
            await this.homePage.productName.fill(String(process.env.ValidPName));
            await this.homePage.productDescription.fill(String(process.env.ValidPDescription));
            await this.homePage.productPrice.fill(String(process.env.ValidPPrice));
            await this.homePage.productDiscount.fill(String(process.env.ValidPDiscount));

            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath));
            // await this.homePage.productUploadButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetails:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }


    async clickAddProductButton() {
        try {
            await this.homePage.addProductButton.click();
            await expect(this.homePage.productAddedPRight).toBeVisible();
            await expect(this.homePage.productAddedPText).toBeVisible();
            await this.homePage.okButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickAddProductButton:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async logOut() {
        try {
            await this.homePage.logOut.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickAddProductButton:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterAdd(initialTableData, updatedTableData) {
        try {
            console.log("Initial Data is \n\n", initialTableData);
            console.log("\n Final Data is \n\n", updatedTableData);

            console.log("Initial data length is ", initialTableData.length);
            console.log("Final  data length is ", updatedTableData.length);
            const lastRow = updatedTableData[updatedTableData.length - 1];

            const name = lastRow.Name;
            const image = lastRow.Image;
            const description = lastRow.Description;
            const price = lastRow.Price;
            const discount = lastRow.Discount;
            const action = lastRow.Action;

            // After value assigning for last row
            if (updatedTableData.length === initialTableData.length + 1) {
                console.log(' Product added successfully');
                console.log("name is ", name); console.log("expected name is ,", String(process.env.ValidPName));

                expect(name).toContain(String(process.env.ValidPName));
                expect(description).toContain(String(process.env.ValidPDescription));
                expect(price).toContain(String(process.env.ValidPPrice));
                expect(discount).toContain(String(process.env.ValidPDiscount));
                expect(action).toBe("EDIT\nDELETE");
                expect(image.length).toBeGreaterThan(0);
            } else {
                console.log('❌ Product addition verification failed');
                throw new Error('Product addition verification failed');
            }

        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in dashboardVerificationAfterAdd:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetailsWithoutName() {
        try {
            await this.homePage.productDescription.fill(String(process.env.ValidPDescription));
            await this.homePage.productPrice.fill(String(process.env.ValidPPrice));
            await this.homePage.productDiscount.fill(String(process.env.ValidPDiscount));

            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath));
            // await this.homePage.productUploadButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetailsWithoutName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async verifyAddProdDisabledDoCancel() {
        try {
            await expect(this.homePage.addProductButton).toBeDisabled();
            await this.homePage.cancelButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in verifyAddProdDisabledDoCancel:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetailsWithoutDescription() {
        try {
            await this.homePage.productName.fill(String(process.env.ValidPName))
            await this.homePage.productPrice.fill(String(process.env.ValidPPrice));
            await this.homePage.productDiscount.fill(String(process.env.ValidPDiscount));
            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath));
            // await this.homePage.productUploadButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetailsWithoutName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetailsWithoutPrice() {
        try {
            await this.homePage.productName.fill(String(process.env.ValidPName))
            await this.homePage.productDescription.fill(String(process.env.ValidPDescription));
            await this.homePage.productDiscount.fill(String(process.env.ValidPDiscount));
            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath));
            // await this.homePage.productUploadButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetailsWithoutName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetailsWithoutDiscount() {
        try {
            await this.homePage.productName.fill(String(process.env.ValidPName))
            await this.homePage.productDescription.fill(String(process.env.ValidPDescription));
            await this.homePage.productPrice.fill(String(process.env.ValidPPrice));
            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath));
            // await this.homePage.productUploadButton.click();
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetailsWithoutName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async enterDetailsWithoutImage() {
        try {
            await this.homePage.productName.fill(String(process.env.ValidPName))
            await this.homePage.productDescription.fill(String(process.env.ValidPDescription));
            await this.homePage.productPrice.fill(String(process.env.ValidPPrice));
            await this.homePage.productDiscount.fill(String(process.env.ValidPDiscount));
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in enterDetailsWithoutName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }


    // Edit Product Functions

    async clickEditProduct() {
        try {
            await this.homePage.rowEditButton_1stRow.click();
            await expect(this.homePage.editProductHeader).toBeVisible();

            // to get existing value

            const existingData = [
                (await this.homePage.editProductName.textContent())?.trim(),
                (await this.homePage.editProductDescription.textContent())?.trim(),
                (await this.homePage.editProductPrice.textContent())?.trim(),
                (await this.homePage.editProductDiscount.textContent())?.trim(),
                (await this.homePage.editProductUploadFileName.textContent())?.trim()
            ];

            console.log(" Existing data is ", existingData);

        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickEditProduct:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async editProductDetailsChange() {
        try {
            await this.homePage.editProductName.fill(String(process.env.ValidPName_Edit));
            await this.homePage.editProductDescription.fill(String(process.env.ValidPDescription_Edit));
            await this.homePage.editProductPrice.fill(String(process.env.ValidPPrice_Edit));
            await this.homePage.editProductDiscount.fill(String(process.env.ValidPDiscount_Edit));

            // Image path setup
            const fileInput = await this.page.$('input[type="file"]');
            await fileInput.setInputFiles(path.resolve(process.env.ValidImagePath_Edit));

        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in editProductDetailsChange:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterEdit(updatedTableData) {
  try {
    console.log("\n Final Data is \n\n", updatedTableData);

    const name = updatedTableData[0].Name;
    const image = updatedTableData[0].Image;
    const description = updatedTableData[0].Description;
    const price = updatedTableData[0].Price;
    const discount = updatedTableData[0].Discount;

    expect(name).toContain(String(process.env.ValidPName_Edit));
    expect(description).toContain(String(process.env.ValidPDescription_Edit));
    expect(price).toContain(String(process.env.ValidPPrice_Edit));
    expect(discount).toContain(String(process.env.ValidPDiscount_Edit));
    expect(image).toBeTruthy(); // or .length > 0

    console.log('✅ Product Edit was successful');

  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in dashboardVerificationAfterEdit:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain');
    }
    throw error; // So AfterStep takes screenshot
  }
}

async clickEditProductAndSuccessMessage() {
        try {
            await this.homePage.editProductButton.click();
            await expect(this.homePage.productEditedPRight).toBeVisible();
            await expect(this.homePage.productEditedPText).toBeVisible();
            await this.homePage.okButton.click();

            await this.page.reload();
            
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickEditProductAndSuccessMessage:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

async removeProductName() {
        try {
            await this.homePage.editProductName.fill('');
                        
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in removeProductName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async changeProductName() {
        try {
            console.log(" In Change Name");
            await this.homePage.editProductName.fill(process.env.changeName);              
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in changeProductName:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async verifyChangeProdDisabledDoCancel() {
        try {
            console.log(" In do cancel module");
            await expect(this.homePage.editProductButton).toBeDisabled();
            await this.homePage.editCancelButton.click();         
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in verifyChangeProdDisabledDoCancel:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterEditName(updatedTableData) {
  try {
    console.log("\n Final Data is \n\n", updatedTableData);
    const name = updatedTableData[0].Name;
    expect(name).toContain(String(process.env.changeName));
    console.log('Name change was successful');
  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in dashboardVerificationAfterEditName:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain');
    }
    throw error; // So AfterStep takes screenshot
  }
}

async removeProductDescription() {
        try {
            await this.homePage.editProductDescription.fill('');
                        
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in removeProductDescription:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async changeProductDescription() {
        try {
            console.log(" In Change Name");
            await this.homePage.editProductDescription.fill(process.env.changeDescription);              
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in changeProductDescription:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterEditDescription(updatedTableData) {
  try {
    console.log("\n Final Data is \n\n", updatedTableData);
    const description = updatedTableData[0].Description;
    expect(description).toContain(String(process.env.changeDescription));
    console.log('Description change was successful');
  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in dashboardVerificationAfterEditDescription:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain');
    }
    throw error; // So AfterStep takes screenshot
  }
}

async removeProductPrice() {
        try {
            await this.homePage.editProductPrice.fill('');
                        
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in removeProductPrice:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async changeProductPrice() {
        try {
            console.log(" In Change Name");
            await this.homePage.editProductPrice.fill(process.env.changePrice);              
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in changeProductPrice:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterEditPrice(updatedTableData) {
  try {
    console.log("\n Final Data is \n\n", updatedTableData);
    const price = updatedTableData[0].Price;
    expect(price).toContain(String(process.env.changePrice));
    console.log('Price change was successful');
  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in dashboardVerificationAfterEditPrice:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain');
    }
    throw error; // So AfterStep takes screenshot
  }
}

async removeProductDiscount() {
        try {
            await this.homePage.editProductDiscount.fill('');
                        
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in removeProductDiscount:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async changeProductDiscount() {
        try {
            console.log(" In Change Discount");
            await this.homePage.editProductDiscount.fill(process.env.changeDiscount);              
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in changeProductDiscount:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }

    async dashboardVerificationAfterEditDiscount(updatedTableData) {
  try {
    console.log("\n Final Data is \n\n", updatedTableData);
    const discount = updatedTableData[0].Discount;
    expect(discount).toContain(String(process.env.changeDiscount));
    console.log('Discount change was successful');
  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in dashboardVerificationAfterEditDiscount:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain');
    }
    throw error; // So AfterStep takes screenshot
  }
}

async clickDeleteProduct() {
  try {
    await this.homePage.rowDeleteButton_1stRow.click();
  } catch (error) {
    console.log("\n\n❌ Failed Message:", error.stack || error.message);
    if (this.attach) {
      const message = `❌ Error in clickDeleteProduct:\n\n${error.stack || error.message}`;
      await this.attach(message, 'text/plain'); // Attach readable text
    }
    throw error; // So AfterStep takes screenshot
  }
}
async clickDeleteProductAndSuccessMessage() {
        try {
            
            await expect(this.homePage.productDeleatedRight).toBeVisible();
            await expect(this.homePage.productDeleatedText).toBeVisible();
            await this.homePage.okButton.click();
            await this.page.reload();
            
        } catch (error) {
            console.log("\n\n❌ Failed Message:", error.stack || error.message);
            if (this.attach) {
                const message = `❌ Error in clickEditProductAndSuccessMessage:\n\n${error.stack || error.message}`;
                await this.attach(message, 'text/plain');  // Attach readable text
            }
            throw error; // So AfterStep takes screenshot
        }
    }



}

