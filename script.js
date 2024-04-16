const delim='#';

const allFairyTales = {
    'milky-way': `test${delim} bla bla bla${delim} bar bar bar`,
    'cinderela': `bla bla bla${delim} foo foo foo`,
};


document.addEventListener("DOMContentLoaded", function() {
    const randomFairyTale = allFairyTales[Object.keys(allFairyTales)[Math.floor(Math.random() * Object.keys(allFairyTales).length)]];
    const textContainer = document.getElementById("scrollingText");
    const dynamicImage = document.getElementById("dynamicImage");

    // Split the long text using the `#` delimiter and filter out empty segments
    const segments = randomFairyTale.split('#').filter(segment => segment.trim() !== '').concat('\n-= THE END! =-');

    let currentSegmentIndex = 0;

    function displayCurrentSegment() {
        if (currentSegmentIndex < segments.length) {
            const segment = segments[currentSegmentIndex];

            // Check if the segment is an image link
            if (segment.match(/^\n?!\[Image/)) {
                const imageUrl = segment.match(/\((.*?)\)/)[1]; // Extract URL
                dynamicImage.src = imageUrl;
                dynamicImage.style.display = 'block'; // Display the image
                currentSegmentIndex++;
                displayCurrentSegment(); // Continue to the next segment immediately after displaying an image
            } else {
                highlightText(segment); // It's a text segment
            }
        }
    }

    function highlightText(segment) {
        const span = document.createElement('span');
        textContainer.appendChild(span); // Append the text span to the container

        let charIndex = 0;
        function highlightCharacter() {
            scrollToBottom(); // Ensure the text container scrolls to the bottom

            if (charIndex < segment.length) {
                span.innerHTML += segment[charIndex]; // Add next character
                span.style.backgroundColor = '#3399ff';
                span.style.color = 'white';
                span.id = 'active';
                charIndex++;
                setTimeout(highlightCharacter, 75); // Slow down to match the reading speed
            } else {
                // Once all characters are highlighted, reset and move to the next segment
                setTimeout(() => {
                    span.style.backgroundColor = null;
                    span.style.color = null; // Reset to the default text color
                    span.id = null;
                    currentSegmentIndex++;
                    displayCurrentSegment(); // Continue to next segment
                }, 500); // Brief pause at the end of a segment
            }
        }

        highlightCharacter(); // Start highlighting characters
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            textContainer.scrollTop = textContainer.scrollHeight;
        });
    }

    displayCurrentSegment(); 
});
