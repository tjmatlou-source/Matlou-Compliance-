# VeriLend Platform Architecture

## Overview
VeriLend is a P2P lending platform designed for the South African market. It connects vetted borrowers with individual lenders, focusing on safe, legal, and transparent lending.

## Tech Stack
- **Backend:** Node.js with Fastify (for high performance and modern API development).
- **Frontend:** React (Vite) with Tailwind CSS.
- **Database:** PostgreSQL (for robust relational data management).
- **Authentication:** JWT-based authentication (using `fastify-jwt` or similar).
- **Task Queue:** BullMQ with Redis (for handling asynchronous tasks like background checks and payment webhooks).

## Database Schema (Proposed)

### Users & Profiles
- `users`: `id`, `email`, `password_hash`, `role` (BORROWER, LENDER, ADMIN), `kyc_status`, `created_at`.
- `profiles`: `user_id`, `first_name`, `last_name`, `id_number`, `phone_number`, `address`, `employment_info`, `monthly_income`.

### Loans & Investments
- `loans`: `id`, `borrower_id`, `amount`, `interest_rate`, `term_months`, `status` (DRAFT, PENDING_VETTING, FUNDING, ACTIVE, COMPLETED, DEFAULTED), `description`, `created_at`.
- `investments`: `id`, `loan_id`, `lender_id`, `amount`, `status`, `created_at`.
- `repayments`: `id`, `loan_id`, `amount`, `due_date`, `status` (PENDING, PAID, OVERDUE), `payment_date`.

### Vetting & Transactions
- `background_checks`: `id`, `user_id`, `provider` (ThisIsMe, SmileID), `external_id`, `status`, `raw_result`, `score`, `created_at`.
- `transactions`: `id`, `user_id`, `amount`, `type` (DEPOSIT, WITHDRAWAL, FUNDING, REPAYMENT), `status`, `reference`, `created_at`.

## Key User Flows

### 1. Borrower Onboarding & Vetting
1. Borrower registers and completes profile.
2. System triggers background check via ThisIsMe/SmileID API.
3. System fetches credit score (TransUnion/Experian).
4. VeriLend Admin reviews findings and approves/rejects the borrower.

### 2. Loan Lifecycle
1. Approved Borrower submits a loan request.
2. Loan is listed on the marketplace.
3. Lenders browse and commit funds to the loan.
4. Once 100% funded, funds are disbursed to the borrower (via Ozow/Peach Payments).
5. Borrower makes monthly repayments.

### 3. Lender Workflow
1. Lender deposits funds into their VeriLend wallet.
2. Lender selects loans to fund.
3. Lender receives principal + interest repayments into their wallet.

## Integration Strategy

### 1. Identity & Vetting (South Africa specific)
- **ThisIsMe:** For identity verification and KYC.
- **TransUnion API:** For credit history and vetting.
- **Stitch:** For bank account verification and income proof (bank statements).

### 2. Payments & Disbursements
- **Peach Payments / PayFast:** For card payments and general gateway services.
- **Ozow:** For instant EFT (low-cost deposits and disbursements).
- **Netcash:** For automated debit orders (repayments).

## API Design (RESTful)

### Auth
- `POST /auth/register` - Create new user.
- `POST /auth/login` - Authenticate user and return JWT.
- `POST /auth/refresh` - Refresh JWT.

### Profile & KYC
- `GET /profile` - Get current user's profile.
- `PUT /profile` - Update profile info.
- `POST /profile/kyc` - Submit KYC data for verification.
- `GET /profile/kyc/status` - Check KYC/Background check status.

### Loans (Borrower)
- `POST /loans` - Create a new loan request.
- `GET /loans/my` - List current borrower's loans.
- `GET /loans/:id` - Get specific loan details.

### Marketplace (Lender)
- `GET /marketplace` - List available loans for funding.
- `POST /loans/:id/invest` - Commit funds to a loan.
- `GET /investments/my` - List lender's investments.

### Wallet & Transactions
- `GET /wallet/balance` - Get current balance.
- `POST /wallet/deposit` - Initiate a deposit (returns payment gateway link).
- `POST /wallet/withdraw` - Request a withdrawal.
- `GET /wallet/transactions` - List transaction history.

### Admin
- `GET /admin/pending-approvals` - List users/loans needing admin review.
- `POST /admin/approve-user/:id` - Approve a user after vetting.
- `POST /admin/approve-loan/:id` - Approve a loan request.

## Security
- **Data at Rest:** Encryption for sensitive user data (ID numbers, bank info).
- **Data in Transit:** TLS 1.3 for all communications.
- **Vetting:** Multi-factor background checks to prevent fraud.
- **Compliance:** Ensure alignment with POPIA (Protection of Personal Information Act).
- **Escrow-like behavior:** Funds are held in a platform-controlled wallet until the loan is fully funded and disbursed.

## Vetting Workflow (The "Healthy Mashonisa" Core)
1. **Automated Check:** Trigger ThisIsMe/SmileID for ID verification.
2. **Financial Check:** Use Stitch/Salt Edge to verify bank statements and income.
3. **Credit Check:** Fetch credit report via TransUnion/Experian API.
4. **Scoring Engine:** Internal logic to assign a "VeriLend Score" based on gathered data.
5. **Manual Audit:** For high-risk or large loans, an admin performs a final manual review of the dossier.

## System Components
- `api-server`: Fastify-based REST API.
- `web-client`: React SPA.
- `worker-service`: For background task processing.
- `db`: PostgreSQL.
- `cache`: Redis.

## Deployment
- Dockerized components.
- Hosted on a cloud provider (AWS/GCP/Azure) with a focus on SA region (e.g., AWS Cape Town af-south-1).
