

export const breadcrumbsMenu=[
    {
        label:'Categories',
        path:'/categories',
        children:[
            {
                path:':category'
            },
            {
                path:'/product/:id'
            }
        ]
    }
];

export const MENU:{
    title:string;
    path:string;
}[]
=[
    {
        title:'Men',
        path:'/categories/Men'
    },
    {
        title:'Women',
        path:'/categories/Women'
    },
    {
        title:'Groceries',
        path:'/categories/Groceries'
    },
    {
        title:'Packed Foods',
        path:'/categories/Packaged Foods'
    },
    {
        title:'Beverages',
        path:'/categories/Beverages'
    },
    {
        title:'Electronics',
        path:'/categories/Electronics'
    }
]

