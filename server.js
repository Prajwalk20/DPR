const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dpr_database",
  password: "PrajwalK@2004",
  port: 5432,
});

app.post("/submit-dpr", async (req, res) => {
  try {
    const { personalInfo, manufactureProduct, surveyInfo, expectedOutput } = req.body;

    const query = `
      INSERT INTO dpr_forms (
        user_type,
        company_name, company_type, company_address, rented,
        full_name, manufacturing_unit, startup_address,
        contact_number, email, product_type, fruits, vegetables, manufacture_product,
        knowledge, market_survey,
        harvesting_time, distance_raw_material, logistic_cost,
        maturity, size, raw_material_cost, yield_monthly, blemishes,
        test_required, water_test, soil_test,
        power_required, energy_cost, water_cost, manpower_cost, construction_cost,
        expected_yield, expected_quality
      )
      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,
        $9,$10,$11,$12,$13,$14,
        $15,$16,
        $17,$18,$19,
        $20,$21,$22,$23,$24,
        $25,$26,$27,
        $28,$29,$30,$31,$32,
        $33,$34
      )
    `;

    const values = [
      personalInfo.userType,
      personalInfo.companyName,
      personalInfo.property,
      personalInfo.address,
      personalInfo.rented,
      personalInfo.fullName,
      personalInfo.manufacturingUnit,
      personalInfo.startupAddress,
      personalInfo.contactNumber,
      personalInfo.email,
      personalInfo.productType,
      personalInfo.fruits,
      personalInfo.vegetables,
      manufactureProduct,
      surveyInfo.knowledge,
      surveyInfo.marketSurvey,
      surveyInfo.harvestingTime,
      surveyInfo.distanceRawMaterial,
      surveyInfo.logisticCost,
      surveyInfo.maturity,
      surveyInfo.size,
      surveyInfo.rawMaterialCost,
      surveyInfo.yieldMonthly,
      surveyInfo.blemishes,
      surveyInfo.testrequired,
      surveyInfo.waterTest,
      surveyInfo.soilTest,
      surveyInfo.powerRequired,
      surveyInfo.energyCost,
      surveyInfo.waterCost,
      surveyInfo.manpowerCost,
      surveyInfo.constructionCost,
      expectedOutput.expectedYield,
      expectedOutput.expectedQuality
    ];

    await pool.query(query, values);

    res.status(200).json({ message: "DPR Saved Successfully" });

  } catch (err) {
    console.error("FULL ERROR:",err);
    res.status(500).json({ error: "Database Error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});