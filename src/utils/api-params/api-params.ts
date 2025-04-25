import { PageDeparmentDto } from "src/deparments/dto/page-deparment.dto";
import { PageCatSubCatDto } from "../../categories/dto/page-cat-subcat.dto";
import { PageProductDto } from "../../produts/dto/page-product.dto";

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
