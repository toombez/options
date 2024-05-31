pub enum FinanceOptionType {
    Call,
    Put,
}

pub struct FinanceOption {
    pub option_type: FinanceOptionType,
}

impl FinanceOption {
    pub fn create_put() -> Self {
        Self { option_type: FinanceOptionType::Put }
    }

    pub fn create_call() -> Self {
        Self { option_type: FinanceOptionType::Call }
    }
}
