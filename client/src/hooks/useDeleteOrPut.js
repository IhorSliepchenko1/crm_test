import AppRouter from "../http/routes";

export const useDeleteOrPut = (name, id) => {

     switch (name) {
          case 'cash':
               return AppRouter.cashRegister + id;
          case 'expenses':
               return AppRouter.expenses + id;
          case 'type':
               return AppRouter.typeExpenses + id;
          default:
               throw new Error('Invalid resource name');
     }

}