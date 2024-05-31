pub enum OptionType {
    Call,
    Put,
}

pub struct Option {
    pub option_type: OptionType,
}

impl Option {
    pub fn create_put() -> Self {
        Self { option_type: OptionType::Put }
    }

    pub fn create_call() -> Self {
        Self { option_type: OptionType::Call }
    }
}
