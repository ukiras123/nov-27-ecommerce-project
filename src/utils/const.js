export const productInputFields = [
    {
        label: "Product Name *",
        name: "title",
        type: "text",
        placeholder: "iPhone 6",
        required: true
    },
    {
        label: "SKU *",
        name: "sku",
        type: "text",
        placeholder: "IP_IDNI_5",
        required: true
    }, {
        label: "Price *",
        name: "price",
        type: "number",
        placeholder: "1999",
        required: true
    },
    {
        label: "Quantity *",
        name: "quantity",
        type: "number",
        placeholder: "10",
        required: true
    }, {
        label: "Sales Price",
        name: "salesPrice",
        type: "number",
        placeholder: "1599",
    }, {
        label: "Sales Start At",
        name: "salesStartAt",
        type: "date",
    }, {
        label: "Sales End At",
        name: "salesEndAt",
        type: "date",
    }, {
        label: "Product Description *",
        name: "description",
        type: "text",
        as: "textarea",
        row: 5,
        required: true,
        placeholder: "Product Desc..."
    },
]

