import { PageDeparmentDto } from "src/deparments/dto/page-deparment.dto";
import { PageCatSubCatDto } from "../../categories/dto/page-cat-subcat.dto";
import { PageProductDto } from "../../produts/dto/page-product.dto";
import { CreatePurchaseOrderDto } from "../../purchase-order/dto/create-purchase-order.dto";
import { Client } from "../../clients/entities/client.entity";

export const Active= () =>{
    return {
        Active:true
    }
};

export const paramsCategory = (id: number,pageCatSubCatDto: PageCatSubCatDto)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ItemsPerPage:15,
        Page:pageCatSubCatDto.Page,
        CategoryID:id
    }
};

export const paramsSubCategory = (id: number,pageCatSubCatDto: PageCatSubCatDto)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ItemsPerPage:15,
        Page:pageCatSubCatDto.Page,
        SubCategoryID:id
    }
};

export const paramsProductInventory = (pageProductDto: PageProductDto)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ItemsPerPage:20,
        Page:pageProductDto.Page
    }
};

export const paramsProductInventoryID = (id: number)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ProductID:id,
        Page:1
    }
};

export const paramsProduct = (pageProductDto: PageProductDto)=> {
    return {
        Page:pageProductDto.Page,
      ItemsPerPage:20
    }
};

export const paramsDepartment = (id: number,pageDeparmentDto: PageDeparmentDto)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ItemsPerPage:20,
        Page:pageDeparmentDto.Page,
        DepartamentID:id
    }
};

export const paramsStatusOrder = (wisOrderId: number, order_number: number)=> {
    return {
        CompanyStoreID: Number(process.env.COMPANY_STORE_ID),
        OrderID: wisOrderId,
        OrderNumber: order_number
    }
}

export const paramsProductInventorySearch = (search: string, pageProductDto: PageProductDto)=> {
    return {
        CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
        ItemsPerPage:20,
        Page:pageProductDto.Page,
        Description:search
    }
};

export const paramsCreatePurchaseOrder = (params: CreatePurchaseOrderDto, perfilUser: Client)=> {
    return {
    companyStoreID: Number(process.env.COMPANY_STORE_ID),
    orderNumber: String(params.order_number), // obligatorio
    observation: `Orden ${params.order_number}`, // obligatorio
    subTotal: params.total,
    tax: params.tax,
    total: params.total,
    dateCreate: new Date(),
    statusWebID: 1,
    identityCard: perfilUser.cedula,
    typePerson:'v',
    Person:{
      CompanyStoreID:Number(process.env.COMPANY_STORE_ID),
      identityCard: perfilUser.cedula,
      identityTypeSymbol:'v',
      name: perfilUser.name,
      lastName: perfilUser.last_name,
      phoneMobile:perfilUser.phone,
      email:perfilUser.user.email
    },
    WEB_OrderProduct: params.detailPurchases.map((detail) => ({
      productID: detail.wis_product_id,
      quantity: detail.quantity,
      salesPrice: detail.price_unit,
      subTotal:detail.price_unit,
      total:detail.price_unit*detail.quantity,
      observation: `Observacion ${detail.wis_product_id}` // obligatorio
    }))
  }
}
