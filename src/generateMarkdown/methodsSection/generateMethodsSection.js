// Генерация секции Methods
export default function generateMethodsSection(methodsInfo) {
    if (!methodsInfo.length) {
        return ``;
    }
    let methodsContent = `    
        <div class="methods-block">
         <div class="block-header">
            <h2>Methods</h2>
            <div class="icon-block">
                M
            </div>
        </div>`;
    methodsContent += `<div class="methods-content">`;
    methodsInfo.forEach((method) => {
        methodsContent += `<div class="methods-item">`;
        const paramsString = method.params
            .map(
                (param) =>
                    `<span>${param.name}</span>: <span style="color:#4ec9b0">${param.type}</span>`
            )
            .join(', ');

        methodsContent += `
            <div class="content-row">
                <div class="method-signature">
                    <span>${method.name}</span>
                    <span>(${paramsString})</span>
                    <span>${method.returnType}</span>
                </div>`;

            if (method.comment) {
                methodsContent += `
                <div class="hr-line"></div>
                <button class="expand-comment" onclick="toggleComment(this)">
                    <span class="arrow">►</span>
                </button>`;
            }

            methodsContent += `</div>
            <div class="comment">${method.comment || ''}</div>`;
        methodsContent += `</div>`;
    });
    methodsContent += `</div></div> 
        <script>
        function toggleComment(button) {
            const methodRow = button.closest('.content-row');
            const comment = methodRow.nextElementSibling;
            const arrow = button.querySelector('.arrow');
        
            if (comment.classList.contains('show')) {
                hideComment(comment, arrow);
            } else {
                showComment(comment, arrow);
            }
        }
        
        function showComment(comment, arrow) {
            comment.style.display = 'block';
            setTimeout(() => {
                comment.classList.add('show'); 
                arrow.classList.add('rotate'); 
            }, 10);
        }
        
        function hideComment(comment, arrow) {
            comment.classList.remove('show'); 
            arrow.classList.remove('rotate');
            setTimeout(() => {
                comment.style.display = 'none'; 
            }, 200); 
        }
        </script>`;
    return methodsContent;
}