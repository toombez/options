// Now don't know how to implement Copy for this struct
#[derive(Debug, Clone /*, Copy*/)]
pub struct UnderlyingAsset {
    pub current_price: isize,
    pub name: String,
}

impl UnderlyingAsset {
    pub fn new(current_price: isize, name: &str) -> Self {
        Self { current_price, name: name.to_string() }
    }

    pub fn new_anonymous_asset(current_price: isize) -> Self {
        Self::new(current_price, "")
    }
}
