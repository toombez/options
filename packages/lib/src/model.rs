use crate::finance_option::FinanceOption;

pub trait Model {
    fn calculate_put_price(&self, option: FinanceOption) -> isize;
    fn calculate_call_price(&self, option: FinanceOption) -> isize;
}
