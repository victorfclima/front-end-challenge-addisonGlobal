class GetPromo {

    constructor() {

        this.promoButton = document.querySelector('#button-promo')
        this.newCustom = document.querySelector('#button-custom')

        this.activeButton()
        this.buttonPress()
        this.getApi()

    }

    //Listening to button's click for: All Promotions | New Customers
    buttonPress() {

        this.promoButton.addEventListener('click', e => {
            this.clearData()
            this.activeButton()
            return this.getApi()
        })

        this.newCustom.addEventListener('click', e => {
            this.clearData()
            this.activeButton('promoOFF')
            return this.getApi(true)
        })

    } // end

    // Clearing data before changing menu
    clearData() {

        let main = document.querySelector('#maincontent').innerHTML = ''

    } //end

    // Coloring activated button
    activeButton(value = 0) {

        if (value == 'promoOFF') {

            this.promoButton.classList.remove('btn-nav-active')
            this.newCustom.classList.add('btn-nav-active')

        } else {

            this.promoButton.classList.add('btn-nav-active')
            this.newCustom.classList.remove('btn-nav-active')

        }

    } // end

    // Fetch API
    getApi(value = 0) {

        fetch('https://www.mocky.io/v2/5bc3b9cc30000012007586b7')

            .then(response => {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(data => {
                    this.checkCustomer(data, value)
                });
            }
            )

            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    } // end


    // Checking the onlyNewCustomers API parameter
    checkCustomer(data, value) {

        // Ordering by sequence value

        data.sort(function (a, b) {

            return a.sequence - b.sequence;

        }); // end ordering

        data.forEach(element => {

            if (element.onlyNewCustomers == value) {
                this.createHtml(element)
            } else if (value == 0) {
                this.createHtml(element)
            }

        });

    } // end


    // Adding data to HTML
    createHtml(data) {

        let main = document.querySelector('#maincontent')

        let newContent = document.createElement('div')
        newContent.classList.add('container')

        newContent.innerHTML =

            `<article>

            <img src="${data.heroImageUrl}" class="promo-img" alt="Promotional image" id="${data.id}">

            <h2>${data.name}</h2>

            <p>${data.description}</p>

            <footer>

                <div class="footer-container">

                    <button type="button" class="btn-terms btn-footer">${data.termsAndConditionsButtonText}</button>
                    <button type="button" class="btn-join btn-footer">${data.joinNowButtonText}</button>

                </div>

            </footer>

        </article>`

        main.appendChild(newContent)

    }

} // end





