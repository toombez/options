use crate::Option::Option;

pub trait Model {
    fn calculate_put_price(&self, option: Option) -> isize;
    fn calculate_call_price(&self, option: Option) -> isize;
}
