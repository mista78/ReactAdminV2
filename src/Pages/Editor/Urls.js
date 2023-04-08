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
            upload_image: [
                {
                    param: 'action',
                    value: 'upload_image'
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
            delete_page: [
                {
                    param: 'action',
                    value: 'delete_page'
                }
            ],
        }
    },
};
export default DataUrl;