class Validator {
    constructor(formId, elements = []) {
        this.form = document.getElementById(formId);
        this.elements = elements;
        this.errors = new Set();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            this.elements.forEach((item) => {
                e.preventDefault();
                this.checkIt(item);
            });
            console.log(this.errors);
            if(this.errors.length === 0){
                this.form.submit();
            }
        });
    }

    checkIt({selector, pattern, method}) {
        let element = document.getElementById(selector).value;
        if(pattern){
            if(!pattern.test(element)){
                this.errors.add({
                    selector: selector,
                    pattern: pattern,
                    method: method
                });
            }
        }else if(method){
            if(this.getPattern(method) && !this.getPattern(method).test(element)){
                this.errors.add({
                    selector: selector,
                    pattern: pattern,
                    method: method
                });
            }
        }
    }

    getPattern(pattern) {
        let patterns = {
            email: new RegExp('^[a-z0-9\-_.]{2,30}@[a-z]{2,10}.[a-z]{2,5}$','gi'),
            phone: new RegExp('[0-9]+', 'ig')
        };
        return patterns[pattern];
    }
}