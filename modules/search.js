export class Search{
    constructor(view, api) {
        this.view = view;
        this.api = api;

        this.view.select_input.addEventListener('input', this.debounce(this.loadRepos.bind(this), 400));
    }

    loadRepos() {
        if (this.view.select_input.value) {
            this.clearRepos();
            this.reposRequest(this.view.select_input.value);
            this.view.select.classList.add('is-active');            
        }else{
            this.clearRepos();
            this.view.message.textContent = '';
        }
    }

    async reposRequest(searchValue){
        try{
            await this.api.loadRepos(searchValue).then((res) => {
                res.json().then((res) => {
                    let reposCount = res.total_count;
                    if (reposCount > 0) {
                        res.items.forEach((repo) => this.view.createSelectItem(repo));
                    }
                    this.view.message.textContent = reposCount > 0 ? '' : 'По вашему запросу репозиториев не найдено';                    
                });
            });
        }catch(e){
            console.log('Error: ' + e);
        }
    }

    clearRepos() {
        this.view.select_body.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if(!immediate) func.apply(context, args);
            }
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
}