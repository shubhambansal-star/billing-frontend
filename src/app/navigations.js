export const navigations = [
  {
    name: " Invoicing",
    description: "",
    type: "dropDown",
    icon: "i-Billing",
    open: "invoice",
    sub: [
      {
        name: "Company",
        description: "Company",
        type: "dropDown",
        icon: "i-Administrator",

        sub: [
          {
            icon: "i-Add-UserStar",
            name: "Add Company",
            path: "/invoice/company/create",

          },
          {
            icon: "i-Receipt-4",
            name: "Company List",
            path: "/invoice/company/list",

          }
        ]
      },
      {
        name: "Party",
        description: "Party",
        type: "dropDown",
        icon: "i-Checked-User",

        sub: [
          {
            icon: "i-Add-User",
            name: "Add Party",
            path: "/invoice/party/create",
            type: "link",

          },
          {
            icon: "i-Receipt-4",
            name: "Party List",
            path: "/invoice/party/list",
            type: "link",

          }
        ]
      },
      {
        name: "Invoice",
        description: "Invoice",
        type: "dropDown",
        icon: "i-Billing",

        sub: [
          {
            icon: "i-Add-File",
            name: "Create Invoice",
            path: "/invoice/invoice/create",
            type: "link",

          },
          {
            icon: "i-Receipt-4",
            name: "Invoice List",
            path: "/invoice/invoice/list",
            type: "link",

          }
        ]
      },
    ]
  },
  {
    name: " Orders",
    description: "",
    type: "dropDown",
    icon: "i-Shopping-Cart",
    open: "orders",
    sub: [
      {
        name: "Broker",
        description: "Broker",
        type: "dropDown",
        icon: "",
        sub: [
          {
            icon: "",
            name: "Add Broker",
            path: "/orders/broker/create",

          },
          {
            icon: "",
            name: "Broker List",
            path: "/orders/broker/list",

          }
        ]
      },

      {
        name: "Party",
        description: "Party",
        type: "dropDown",
        icon: "",
        sub: [
          {
            icon: "",
            name: "Add Party",
            path: "/orders/party/create",

          },
          {
            icon: "",
            name: "Party List",
            path: "/orders/party/list",

          }
        ]
      },

      {
        name: "Sales Order",
        description: "Company",
        type: "dropDown",
        icon: "",
        sub: [
          {
            icon: "",
            name: "Add Sales Order",
            path: "/orders/sales/create",

          },
          {
            icon: "",
            name: "Sales Order List",
            path: "/orders/sales/list",

          }
        ]
      },

      {
        name: "Purchase Order",
        description: "Party",
        type: "dropDown",
        icon: "",
        sub: [
          {
            icon: "",
            name: "Add Purchase Order",
            path: "/orders/purchase/create",
            type: "link"
          },
          {
            icon: "",
            name: "Purchase Order List",
            path: "/orders/purchase/list",
            type: "link"
          }
        ]
      },
      {
        name: "Loading",
        description: "Loading",
        type: "dropDown",
        sub: [
          {
            name: "Loading",
            path: "/orders/loading/create",
            type: "link"
          },
          {
            name: "Loading List",
            path: "/orders/loading/list",
            type: "link"
          }
        ]
      },

      {
        name: "Unloading",
        description: "Unloading",
        type: "dropDown",
        sub: [
          {
            name: "Unloading",
            path: "/orders/unload/create",
            type: "link"
          },
          {
            name: "Loading And Unloading Register",
            path: "/orders/unload/list",
            type: "link"
          }
        ]
      },

    ]
  },
]