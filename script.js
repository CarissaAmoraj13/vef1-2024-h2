document.addEventListener('DOMContentLoaded', async function () {
    // Paths to your JSON files
    const jsonPaths = {
        dataIndex: 'data/index.json',
        htmlIndex: 'html/index.json',
        cssIndex: 'css/index.json',
        jsIndex: 'js/index.json',

        htmlKeywords: 'html/keywords.json',
        cssKeywords: 'css/keywords.json',
        jslKeywords: 'js/keywords.json',

        htmlLectures: 'html/lectures.json',
        cssLectures: 'css/lectures.json',
        jsLectures: 'js/lectures.json',

        htmlQuestions: 'html/questions.json',
        cssQuestions: 'css/questions.json',
        jsQuestions: 'js/questions.json',
    };

    // Function to fetch data from a JSON file
    async function fetchData(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to display the content
    function displayContent(data, sectionId) {
        const section = document.getElementById(sectionId);
        if (!section || !data) return;

        section.innerHTML = ''; // Clear any previous content

        // Handle the case where data is an object and has content in it
        if (Array.isArray(data)) {
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('content-item');

                const itemTitle = document.createElement('h3');
                itemTitle.textContent = item.title || 'Untitled';
                itemElement.appendChild(itemTitle);

                const itemDescription = document.createElement('p');
                itemDescription.textContent = item.text || 'No description available';
                itemElement.appendChild(itemDescription);

                section.appendChild(itemElement);

                // If there is a 'content' field (like 'lectures'), recursively display that as well
                if (item.content) {
                    item.content.forEach(subItem => {
                        const subItemElement = document.createElement('div');
                        subItemElement.classList.add('content-sub-item');

                        const subItemTitle = document.createElement('h4');
                        subItemTitle.textContent = subItem.title || 'Untitled';
                        subItemElement.appendChild(subItemTitle);

                        const subItemDescription = document.createElement('p');
                        subItemDescription.textContent = subItem.text || 'No description available';
                        subItemElement.appendChild(subItemDescription);

                        itemElement.appendChild(subItemElement);
                    });
                }
            });
        } else {
            // Handle single data object (e.g., index.json)
            const itemElement = document.createElement('div');
            itemElement.classList.add('content-item');

            const itemTitle = document.createElement('h3');
            itemTitle.textContent = data.title || 'Untitled';
            itemElement.appendChild(itemTitle);

            const itemDescription = document.createElement('p');
            itemDescription.textContent = data.text || 'No description available';
            itemElement.appendChild(itemDescription);

            section.appendChild(itemElement);
        }
    }

    // Initialize page content
    async function initializePage() {
        // Load and display data for each section
        const indexData = await fetchData(jsonPaths.dataIndex);
        console.log('Index Data:', indexData); // Log the data to debug

        const htmlIndexData = await fetchData(jsonPaths.htmlIndex);
        console.log('HTML Index Data:', htmlIndexData);

        const cssIndexData = await fetchData(jsonPaths.cssIndex);
        console.log('CSS Index Data:', cssIndexData);

        const jsIndexData = await fetchData(jsonPaths.jsIndex);
        console.log('JS Index Data:', jsIndexData);

        // Display content for each section
        displayContent([indexData], 'index-section');
        displayContent([htmlIndexData], 'html-index-section');
        displayContent([cssIndexData], 'css-index-section');
        displayContent([jsIndexData], 'js-index-section');
    }

    // Call initializePage function
    initializePage();
});

