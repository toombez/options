use chrono::Utc;
use lib::prelude::*;

fn main() {
    let options: Vec<FinanceOption> = vec![1.0, 2.0, 3.0, 4.0]
        .iter()
        .enumerate()
        .map(|(index, value)| {
            let mut name = "Asset".to_string();
            name.push_str(&index.to_string());

            UnderlyingAssetBuilder::default()
                .name(name)
                .asset_type(UnderlyingAssetType::Stock)
                .price(FloatFromZero::parse(*value).unwrap())
                .volatility(FloatFromZeroToOneHundred::parse(5.0).unwrap())
                .build()
                .unwrap()
        })
        .map(|asset| {
            FinanceOptionBuilder::default()
                .risk_free_interest_rate(RiskFreeInterestRate::parse(5.0).unwrap())
                .underlying_asset(asset)
                .option_type(FinanceOptionType::Put)
                .expiration_date(Utc::now())
                .strike_price(StrikePrice::parse(100.0).unwrap())
                .build()
                .unwrap()
        })
        .collect();

    options
        .iter()
        .cloned()
        .for_each(|o|println!("{:?}\n{}", o, "=".repeat(80)));
}
