# ICICI Bank Statement Parser

The UPI Statement Parser is a Python & Node based tool that helps you organize and parse your bank statements(only ICICI bank at the time of writing). It specifically focuses on extracting valuable information from the "Transaction Remarks" column for transactions done via UPI. This information is then split into three distinct columns: Payee, Cheque Number, and Transaction Remarks

**Note**: Parsed Transaction Remarks captures notes stored via apps like paytm and gpay for each transaction

## Table of Contents

- [Introduction](#icici-bank-statement-parser)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Parsing ICICI Bank Statements](#parsing-icici-bank-statements)
  - [Backend Setup](#backend-setup)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Transaction Remarks Parsing**: Extracts crucial information from the "Transaction Remarks" column of ICICI bank statements.
- **Data Organization**: Splits extracted information into three columns - Payee, Cheque Number, and Transaction Remarks.
- **Backend for Payee Name Resolution**: Utilizes a Node.js backend to resolve payee names based on their UPI IDs.

## Getting Started

### Prerequisites

Before using the UPI Statement Parser, ensure you have the following prerequisites:

- Python 3.x
- Node.js (for backend)
- [PAYU SDK Client Key and Salt](https://payu.in/docs/180115162550.html) for UPI ID resolution (for backend, not required for basic parsing)
  - For testing and development purposes, you can use non-commercial keys.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:SurajMeena/upi-transaction-parser.git
   cd upi-transaction-parser
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

## Usage

### Parsing UPI Statements

1. Place your ICICI bank statement CSV file in the project directory.
1. Rename the file name in the transaction_parser.py
1. Run the parser script:

   ```bash
   python3 transaction_parser.py
   ```

1. The parsed data will be saved in a new CSV file, which will include columns for Payee, Cheque Number, and Transaction Remarks.

### Backend Setup

The backend in Node.js is used to resolve payee names based on their UPI IDs. Follow these steps to set up the backend:

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

1. Rename `.env.sample` to `.env` in the `backend` directory and provide following information:

   ```
   PAYU_KEY=
   PAYU_SALT_V1=
   PAYU_SALT_V2=
   MYSQL_HOST=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_DATABASE=
   ```

1. Start the backend server:
   ```bash
   node server.js
   ```

Now, your Python application can make requests to the backend for payee name resolution.
## FAQ

**Q: Why is the backend implemented in Node.js and not Python?**

A: During development, the PAYU SDK for Python wasn't working as expected, so a Node.js SDK was used as an alternative. It's recommended for testing and development purposes, and you can use non-commercial keys with it.

**Q: Why is MySQL needed?**

A: The backend uses MySQL to store the payee name resolution data. This is done to avoid making requests to the PAYU API for every transaction.

**Q: What do I use this repo for?**

A: I personally use Money Manager Ex(MMEX) to manage my finances. MMEX has a feature to import bank statements, but it doesn't parse the transaction remarks column. This repo can be used to parse the transaction remarks column and then import the CSV file into MMEX.

I hope, You can find usecases for this simple repo in your daily life, whether it is to expand this for all sorts of banks or to use it for your own personal finance management.
## Contributing

Contributions are welcome through forking! If you believe that a change can benefit everyone, please submit a pull request to this repository as well.
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
