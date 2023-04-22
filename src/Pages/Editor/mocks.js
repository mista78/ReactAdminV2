export default [
    {
        id: '1',
        name: 'Line',
        parent: null,
        cols: '1fr',
        children: [
            {
                id: '2',
                name: 'Layouts',
                parent: '1',
                cols: '1fr',
                children: [
                    {
                        id: '3',
                        name: 'HeroBanner',
                        value: 'HeroBanner',
                        parent: '2',
                        cols: '1fr',
                        children: []
                    },
                    {
                        id: '4',
                        name: 'Introduction',
                        parent: '2',
                        cols: '1fr',
                        children: []
                    }
                ]
            },
            {
                id: '3',
                name: 'Layouts',
                parent: '1',
                cols: '1fr',
                children: [
                    
                ]
            }

        ]
    }
];