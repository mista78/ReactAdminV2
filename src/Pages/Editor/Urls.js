const DataUrl = {
    ContactfForm: {
        get: {
            all_cegosform: [
                {
                    param: 'action',
                    value: 'get_all_cegosform'
                }
            ]
        },
    },

    Editor: {
        get: {
            get_pages: [
                {
                    param: 'action',
                    value: 'get_pages'
                }
            ]
        },
        post: {
            get_page: [
                {
                    param: 'action',
                    value: 'get_page'
                }
            ],
            save_page: [
                {
                    param: 'action',
                    value: 'save_page'
                }
            ],
            add_page: [
                {
                    param: 'action',
                    value: 'add_page'
                }
            ],
        }
    },
};
export default DataUrl;