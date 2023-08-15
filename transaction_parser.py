# %%
import pandas as pd
import requests
from requests.auth import HTTPBasicAuth

# %%
df = pd.read_csv("ICICI Debit.csv", delimiter=",")

# %%
df

# %%
# Utility functions
def findNotes(row):
  if(row.split('/')[0] == "UPI"):
    return row.split('/')[2]
  return "";
def findPayee(row):
  print(row)
  if row.split('/')[0] == "UPI":
    return row.split('/')[3]
  return row;
def findChequeNumber(row):
  if row.split('/')[0] == "UPI":
    return row.split('/')[1]
  return "";

def findPayeeName(row):
  if row.split('/')[0] == "UPI":
    upi_id = row.split('/')[3]
    resp = requests.get("http://localhost:3000/api/validateVPA/" + upi_id)
    resp_json = resp.json() if resp.status_code == 200 else {}
    if resp_json == {} or resp_json["details"]["isVPAValid"]:
      return upi_id
    details = resp_json["details"]
    if details["isVPAValid"]:
      # cleaning redundant spaces
      return " ".join(details["payerAccountName"].strip().split())
  return row

# %%
df['Payee'] = df['Transaction Remarks'].apply(findPayeeName)
df['Cheque Number'] = df['Transaction Remarks'].apply(findChequeNumber)
df['Transaction Remarks'] = df['Transaction Remarks'].apply(findNotes)

# %%
df.to_csv("processedSavingsICICI.csv", index=False)