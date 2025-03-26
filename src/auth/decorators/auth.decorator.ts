import { applyDecorators } from "@nestjs/common"
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guads/auth.guard";
import { RolesGuard } from "../guads/roles.guard";
import { Rol } from "../../utils/enums/rol.enum";
import { Roles } from "../decorators/roles.decorator";

 export const Auth = (role: Rol) =>{
    return applyDecorators(
        UseGuards(AuthGuard, RolesGuard),
        Roles(role)
    )
 } 