use lib::prelude::*;

fn main() {
    let asset = UnderlyingAssetBuilder::default()
        .price(UnderlyingAssetPrice::parse(5.0).unwrap())
        .name("Asset 1".to_string())
        .build()
        .unwrap();

    let expiration_date = ExpirationDate
        ::parse_from_str("2023 Apr 13 12:09:14.274 +0000", "%Y %b %d %H:%M:%S%.3f %z")
        .unwrap();

    let option = FinanceOptionBuilder::default()
        .expiration_date(expiration_date)
        .volatility(Volatility::parse(0.5).unwrap())
        .risk_free_interest_rate(RiskFreeInterestRate::parse(0.5).unwrap())
        .underlying_asset(asset)
        .option_type(lib::finance_option::FinanceOptionType::Call)
        .strike_price(StrikePrice::parse(100.0).unwrap())
        .build()
        .unwrap();

    println!("{:?}", option)
}
