import{
    PAYMENT__SET
} from './type'

export const PaymentReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case PAYMENT__SET:{
            return state = {
                success:true,
                payload:payload,
              }
        }
        default:
            return state;
    }
}