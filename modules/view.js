export class View{
    constructor() {
        this.app = document.getElementById('app');

        this.select = this.createElement('div', 'select');
        this.select_input = this.createElement('input', 'select__input');
        this.select_input.setAttribute('type', 'text');
        this.select_input.setAttribute('name', 'search-value');
        this.select_body = this.createElement('div', 'select__body');

        this.message = this.createElement('span', 'counter');

        this.select.append(this.select_input);
        this.select.append(this.select_body);
        this.select.append(this.message);

        this.reposList = this.createElement('div', 'reposList');
        this.reposList.addEventListener('click', (event) => {
            let target = event.target;
            if(target.className != 'item__btn') return;
            target.closest('.reposList__item').remove();
        })

        this.app.append(this.select);
        this.app.append(this.reposList);

    }

    createElement(elementTag, elementClass) {
        const elem = document.createElement(elementTag);
        if (elementClass) {
            elem.classList.add(elementClass);
        }
        return elem;
    }

    createSelectItem(repoData) {
        const selectItem = this.createElement('div', 'select__item');
        selectItem.addEventListener('click', (event) => {
            this.createRepoCard(repoData);
            const select = event.target.closest('.select'),
            selectInput = select.querySelector('.select__input');
            selectInput.value = '';
            select.classList.remove('is-active');
        });
        selectItem.textContent = repoData.name;
        this.select_body.append(selectItem);
    }


    createRepoCard(repoData){
        const repoCard = this.createElement('div', 'reposList__item');
        const repoList = this.createElement('ul', 'item__characters');
        repoList.innerHTML = `<li>Name: ${repoData.name}</li>
                                    <li>Owner: ${repoData.owner.login}</li>
                                    <li>Stars: ${repoData.stargazers_count}</li>`
        const btn = this.createElement('button', 'item__btn');
        btn.innerHTML = `&times;`
        repoCard.append(repoList);
        repoCard.append(btn);
        this.reposList.append(repoCard);
    }


    
}
