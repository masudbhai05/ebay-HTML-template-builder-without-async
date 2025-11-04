
// JS ফাইলের শুরুতে একবার CSS ফাইল লোড করো
let templateCSS = '';

fetch('/templates/datorpro-teplate.css')
  .then(res => res.text())
  .then(css => templateCSS = css);

const ebayTempate = (
    title, vendor, sku, specs, productImage, selectedCondition, overviewHeading, overviewContent, labelHeading, labelContent, returnHeading, retuncontent, returnImageURL, warrantyHeading, warrantyImageURL, warrantycontent, promiseHeading, promiseImageURL, promiseContent
) => {
    // const cssCode = async () => {
    //     const response = await fetch("/templates/datorpro-teplate.css");
    //     return await response.text();
    // }

    // Temporary div তৈরি করি যাতে HTML ধরতে পারি
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = promiseContent;

    const paragraphs = tempDiv.querySelectorAll('p');
    if (paragraphs.length === 0) return ''; // কিছু না থাকলে খালি ফেরত দেবে

    let tableRows = '';
    paragraphs.forEach(p => {
        const text = p.innerHTML.trim();
        if (text) {
            tableRows += `
                <tr>
                    <td class="tick">
                        <img src="https://i.postimg.cc/cHJ25Mmg/check.png" alt="">
                    </td>
                    <td><p>${text}</p></td>
                </tr>
            `;
        }
    });


    return `
    <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DatorPro Store</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&amp;display=swap" rel="stylesheet">


<style>
    ${templateCSS}
</style>
<!-- product slider css -->
<div class="main-container">
    <section class="top-area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4">
                    <div class="logo">
                        <a>
                            <img alt="" src="https://i.postimg.cc/NGdkhVJb/dp-logo-2.png" class="logo-img">
                        </a>
                    </div>
                </div>
                <div class="col-md-4 text-sm-center">
                    <div class="search-box text-sm-center">
                        <a target="_blank"
                            href="https://www.ebay.com/str/globaltechnologydeals?_trksid=p4429486.m145687.l149086">
                            <img alt="" src="https://i.postimg.cc/4NXFDXVJ/search.png">
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="contact-btn-area text-center float-md-end ">
                        <a class="contact-btn" target="_blank"
                            href="https://www.ebay.com/str/globaltechnologydeals?_trksid=p4429486.m145687.l149086">Contact
                            Seller</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="product-area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <section class="gallery">
                        <img alt="" class="gallery-img"
                            src=${productImage}>
                    </section>
                </div>
                <div class="col-md-6 product-content">
                    <h3><span class="badge bg-primary fw-normal">${selectedCondition || 'New'}</span></h3>
                    <h1>${title}</h1>
                     <div class="vendor-SKU d-flex align-items-center">
                        <p>${vendor} : </p> <span>${sku}</span>
                    </div>
                    <div class="d-flex">
                        <div class="features w-50 text-start">
                            <h4 class="features-tilte ">Specs</h4>
                            <div class="features-area">
                                <div class="row">
                                   ${specs.map(spec => `<div class="single-feature ">
                                        <div class="feature-icon">
                                            <img src="https://i.postimg.cc/cHJ25Mmg/check.png" alt="">
                                        </div>
                                        <p>${spec.trim()}</p></div>`).join("")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="description-tab-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="tab-wrapper mb-40">
                        <div class="row">
                            <div class="col-12">
                                <div class="tabset">
                                    <section id="Overview">
                                        <h4 class="overview-heading">${overviewHeading}</h4>
                                        ${overviewContent}
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-wrapper">
                        <div class="tabset">
                            <section id="Overview">
                                <h4 class="overview-heading">${labelHeading}</h4>
                                <div>
                                ${labelContent}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="tab-wrapper">
                        <div class="tabset">
                            <section id="Overview">

                                <div class="row">
                                    <div class="col-md-8">
                                        <h4 class="overview-heading">${returnHeading}</h4>
                                        <div>
                                             ${retuncontent}
                                        </div>
                                    </div>
                                    <div class="col-md-4  ">
                                        <img class="float-end" src="${returnImageURL}" alt="">
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="tab-wrapper">
                        <div class="tabset">
                            <section id="Overview">

                                <div class="row">
                                    <div class="col-md-8">
                                        <h4 class="overview-heading">${promiseHeading}</h4>
                                        <div class="promiss-content">
                                            <table>
                                                <tbody>
                                                   ${tableRows} 
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <img class="float-end" src="${promiseImageURL}" alt="">
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="tab-wrapper">
                        <div class="tabset">
                            <section id="Overview">

                                <div class="row">
                                    <div class="col-md-8">
                                        <h4 class="overview-heading">${warrantyHeading}</h4>
                                        <div>
                                            ${warrantycontent}                                        
                                        </div>
                                    </div>
                                    <div class="col-md-4  ">
                                        <img class="float-end" src="${warrantyImageURL}" alt="">
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-area">
        <div class="container">
            <div class="contact-btn-area">
                <a class="contact-btn" target="_blank"
                    href="https://www.ebay.com/str/globaltechnologydeals?_trksid=p4429486.m145687.l149086">CONTACT
                    US</a>
            </div>
        </div>
    </section>
</div>
    
    `;
}