(function ($) {
    "use strict";

    // GLOBALLY get value 
    const labelHeadingInput = document.querySelector('#label-heading');
    const returnHeadingInput = document.querySelector('#return-heading');
    const returnImageURLInput = document.querySelector('#returnImageURL');
    const warrantyHeadingInput = document.querySelector('#warranty-heading');
    const warrantyImageURLInput = document.querySelector('#warrantyImageURL');
    const promiseHeadingInput = document.querySelector('#promise-heading');
    const promiseImageURLInput = document.querySelector('#promiseImageURL');

    // GLOBAL VARIABLIE 
    let previewWindow = null;
    const defaultLabelContent = `<p>All of our products, including sprinkler heads and other irrigation components, come directly from the manufacturer’s authorized distribution channels. Items distributed for retail display often include labels or stickers, but products sourced through these direct channels typically do not. This allows us to offer the same high-quality items at lower, more affordable prices for our customers. Rest assured, all items are genuine and meet the highest industry standards.</p>`;

    const defaultReturnContent = `<p>We aim for your complete satisfaction with a generous <strong>30-day return</strong> window at no cost to you. For a smooth process, please ensure returned items are in their original shipped condition, including all packaging and accessories. Items not meeting this requirement may be subject to a restocking fee. </p>`;

    const defaultWarrantyContent = `<p>All items come with a 30-day DOA warranty. Please note, the warranty does not cover damages due to misuse, such as water exposure or buyer's remorse.</p>`;

    const defaultPromiseContent = `<p>Ensuring your satisfaction is our top priority. Orders made by <strong>2 PM EST</strong> will be shipped the same day, and all other items will be shipped within <strong>ONE BUSINESS day</strong>. </p>
<p>Some items are sourced from the manufacturer and may take <strong>5 to 7 business days </strong> to ship. Please check the <strong>handling time</strong> and <strong>delivery date</strong> at checkout.</p>
<p>Each item undergoes rigorous professional testing to meet our strict quality standards.</p>
<p>Our dedicated team is available to assist you promptly. We aim to respond to all messages within <strong>24 hours</strong>.</p>`;

    // ----------------------Overview Quill Editor--------------------
    let toolbarOption = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': ['#000', '#f15208ff', '#89ec07ff'] }, { 'background': ['#000', '#f15208ff', '#89ec07ff'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'align': [] }],
        ['clean']
    ];
    const options = {
        debug: 'info',
        modules: { toolbar: toolbarOption, },
        placeholder: 'Write a product overview...',
        theme: 'snow'
    };

    const overviewEditor = new Quill('#overview-editor', options)
    // overviewEditor.enable(false);
    const labelEditor = new Quill('#label-editor', options); //Label Quill Editor
    const retunEditor = new Quill('#return-editor', options); //Return Quill Editor
    const promiseEditor = new Quill('#promise-editor', options);  //Promise Quill Editor
    const warrantyEditor = new Quill('#warranty-editor', options) //Warranty Quill Editor
    // warrantyEditor.enable(false);

    // /////////////////////////////// Main section start /////////////////////////////////

    // ✅ পেজ লোডের সময় default বসানো
    window.addEventListener('DOMContentLoaded', () => {
        if (labelEditor.getText().trim() === '') {
            labelEditor.root.innerHTML = defaultLabelContent;
        }
        if (retunEditor.getText().trim() === '') {
            retunEditor.root.innerHTML = defaultReturnContent;
        }
        if (warrantyEditor.getText().trim() === '') {
            warrantyEditor.root.innerHTML = defaultWarrantyContent;
        }
        if (promiseEditor.getText().trim() === '') {
            promiseEditor.root.innerHTML = defaultPromiseContent;
        }
    });
    // ✅ Reset Buttons
    document.getElementById('resetLabelBtn').addEventListener('click', () => {
        labelEditor.root.innerHTML = defaultLabelContent;
        labelHeadingInput.value = `Why doesn't my item have a label or sticker?`;

    });
    document.getElementById('resetReturnBtn').addEventListener('click', () => {
        retunEditor.root.innerHTML = defaultReturnContent;
        returnHeadingInput.value = `Return & Refund policy`;
        returnImageURLInput.value = `https://i.postimg.cc/K8th1ZBZ/OBJECTS.png`;

    });
    document.getElementById('resetWarrantyBtn').addEventListener('click', () => {
        warrantyEditor.root.innerHTML = defaultWarrantyContent;
        warrantyHeadingInput.value = `What about the warranty?`;
        warrantyImageURLInput.value = `https://i.postimg.cc/DzdytC73/warrenty.png`;

    });
    document.getElementById('promiseReturnBtn').addEventListener('click', () => {
        promiseEditor.root.innerHTML = defaultPromiseContent;
        promiseHeadingInput.value = `Our promise`;
        promiseImageURLInput.value = `https://i.postimg.cc/fTnPmWkr/promiss.png`;

    });

    // get vendor from the select option 
    let selectedCondition = '';
    document.getElementById("condition").addEventListener("change",  (event) => {
        selectedCondition = event.target.value;
    });

    // Generate dynamic HTML
    const generateHTML =  (selectedCondition) => {
        const title = document.querySelector('#main-title').value;
        const productImage = document.querySelector('#product-imageiURL').value;
        const specs = document.querySelector('#specification').value.split(';');
        const sku = document.querySelector('#sku').value;
        const vendor = document.querySelector('#vendor').value;
        const overviewHeading = document.querySelector('#overview-heading').value || 'Overview';
        const overviewContent = overviewEditor.root.innerHTML;
        const labelHeading = labelHeadingInput.value.trim();
        const labelcontent = labelEditor.root.innerHTML;
        const returnHeading = returnHeadingInput.value.trim();
        const returnImageURL = returnImageURLInput.value.trim();
        const retuncontent = retunEditor.root.innerHTML;
        const warrantyHeading = warrantyHeadingInput.value.trim();
        const warrantyImageURL = warrantyImageURLInput.value.trim();
        const warrantycontent = warrantyEditor.root.innerHTML;
        const promiseHeading = promiseHeadingInput.value.trim();
        const promiseImageURL = promiseImageURLInput.value.trim();
        const promiseContent = promiseEditor.root.innerHTML;

        return ebayTempate(
            title, vendor, sku, specs, productImage, selectedCondition, overviewHeading, overviewContent, labelHeading, labelcontent, returnHeading, retuncontent, returnImageURL, warrantyHeading, warrantyImageURL, warrantycontent, promiseHeading, promiseImageURL, promiseContent
        );
    }

    document.getElementById('previewBtn').addEventListener('click',  () => {
        const html = generateHTML(selectedCondition);
        if (!previewWindow || previewWindow.closed) {
            previewWindow = window.open('preview.html', '_blank');
            previewWindow.onload = () => {
                previewWindow.postMessage({ type: 'updatePreview', html }, '*');
            };
        } else {
            previewWindow.postMessage({ type: 'updatePreview', html }, '*');
        }
    });

    // Auto update preview
    // select all input, textarea, and select elements
    document.querySelectorAll('input, textarea, select').forEach((el) => {
        el.addEventListener('input', updatePreview);    // input / textarea
        el.addEventListener('change', updatePreview);   // select dropdown
    });

    // common function to update preview
     function updatePreview(event) {
        if (event.target.id === "condition") {
            selectedCondition = event.target.value; // update selectedCondition
        }

        if (previewWindow && !previewWindow.closed) {
            const html =  generateHTML(selectedCondition); // pass condition
            previewWindow.postMessage({ type: 'updatePreview', html }, '*');
        }
    }


    // ✅ Download HTML template
    document.getElementById('downloadBtn').addEventListener('click',  () => {
        const html =  generateHTML(selectedCondition);

        // Blob তৈরি করি (ফাইলের মতো)
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // ডাউনলোড করার জন্য লিঙ্ক তৈরি
        const a = document.createElement('a');
        a.href = url;
        const title = 'ebay-template';
        a.download = `${title.replace(/\s+/g, '_')}.html`;

        // a.download = 'ebay-template.html'; // ডাউনলোড ফাইলের নাম
        document.body.appendChild(a);
        a.click();

        // পরিষ্কার করা
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ✅ Copy HTML template
    document.getElementById('copyBtn').addEventListener('click',  () => {
        const html =  generateHTML(selectedCondition);

        try {
             navigator.clipboard.writeText(html);
            alert('✅ HTML code copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('❌ Failed to copy HTML code.');
        }
    });


})(jQuery)