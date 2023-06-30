class Search {
    // Hello there, this is a custom class created by Wildan M Zaki

    // Tolong sertakan selector untuk object configs, (Contoh: '#container', '.item')
    // classItem: string
    // classSearch: string / array

    constructor(configs) {
        this.classItem = configs.classItem;
        this.classSearch = configs.classSearch;
        this.container = configs.container;
        this.firstLabel = configs.firstLabel;
        this.searchLabel = configs.searchLabel;
        this.searchNumber = configs.searchNumber;
        this.found = [];
    }

    // Memfilter item yang ditemukan berdasarkan hasil method find yang menentukan ada atau tidaknya sesuatu yang dicari
    filter(event){
        const found = [];
        if ($('#notItemFound').length) {
            $('#notItemFound').remove();
        }
        $(this.classItem).each((index, element) => {
            if (this.find(element, event.target.value)) {
                $(element).removeClass('d-none');
                found.push(element);
            } else {
                $(element).addClass('d-none');
            }
        });
        if (!found.length) {
            $(this.container).append(
                `
                    <div class='w-100 p-5 text-center bg-light' id='notItemFound'>
                        <p>Maaf, yang kamu cari tidak ditemukan</p>
                    </div>
                `
            );
        }
        this.found = found;
    }

    // Menentukan ada atau tidaknya string yang dicari dari sebuah element
    find(element, searched) {
        // Class Search bisa dua opsi: array atau string
        if (typeof this.classSearch == 'string') {
            const available = ($(element).find(this.classSearch).html()).toLowerCase();
            return available.includes(searched.toLowerCase());
        } else if (typeof this.classSearch == 'object') {
            let available, result = false, count = 0;
            while (count < this.classSearch.length) {
                available = ($(element).find(this.classSearch[count]).html()).toLowerCase();
                if (available.includes(searched.toLowerCase())) {
                    result = true;
                    break;
                }
                count++;
            }
            return result;
        } else {
            console.error('Allowed type just string or array');
        }
    }

    result(event){
        $(this.searchLabel).html(((event.target.value)? event.target.value: this.firstLabel));
        $(this.searchNumber).html(this.found.length);
    }
}

export default Search;