/* In this class we can define all sqlite queries*/
export class globalStrings{  
//DataBase Name
public static mainDB = {name: "famiy.db", location: "default"}

//Query Types
public static insert="insert";
public static update="update";

//Table names
public static categoryTableName = "categories"
public static membersTableName = "members" 
public static financeTableName = "finance" 
public static bankTableName = "bank" 
public static expenseTableName = "expense"     
 
//MasterTable Queries
 public static  masterTableCreation(tablename): string{return "CREATE TABLE IF NOT EXISTS "+tablename+ "(id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, name TEXT)" }
 public static  addMasterTableRecords(tablename): string{return "INSERT INTO "+tablename+ " ('name','date') VALUES " }
 public static getMasterCategories = "select * from categories" 
 public static catUpdate ="UPDATE "+globalStrings.categoryTableName+ " SET date = (?), name = (?) WHERE id = (?)"
 public static catAdd = "INSERT INTO "+globalStrings.categoryTableName+ " (date, name) VALUES (?,?)";
 


 //Common Queries
 public static isexistTable = "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name="  
 public static  deleteTableRecords(tablename): string{return "DELETE FROM "+tablename+" WHERE id = ?"  }
  
 //Tables Creation
  public static membersTable="CREATE TABLE IF NOT EXISTS "+globalStrings.membersTableName+ " (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, name TEXT,gender TEXT,dob TEXT, aadhar TEXT, mobile TEXT,email TEXT,passport TEXT,ration TEXT,pan TEXT)";
  public static financeTable="CREATE TABLE IF NOT EXISTS "+globalStrings.financeTableName+ " (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, name TEXT, amount TEXT, intrest TEXT,mobile TEXT,village TEXT,desc TEXT,total TEXT)";
  public static bankTable="CREATE TABLE IF NOT EXISTS "+globalStrings.bankTableName+ " (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, name TEXT, number TEXT, ifsc TEXT,branch TEXT,userId INTEGER)"
  public static expenseTable="CREATE TABLE IF NOT EXISTS "+globalStrings.expenseTableName+ " (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE,datestring TEXT, type TEXT, cat TEXT, amount TEXT,desc TEXT)" 

  //Tables Records insertion
  public static membersInsertion = "INSERT INTO "+globalStrings.membersTableName+ " (date, name,gender,dob,aadhar, mobile,email,passport,ration,pan) VALUES (?,?,?,?,?,?,?,?,?,?)";
  public static financeInsertion = "INSERT INTO "+globalStrings.financeTableName+ " (date, name, amount, intrest, mobile, village, desc, total) VALUES (?,?,?,?,?,?,?,?)"
  public static bankInsertion = "INSERT INTO "+globalStrings.bankTableName+ " (date, name, number, ifsc, branch, userid) VALUES (?,?,?,?,?,?)";
  public static expenseInsertion = "INSERT INTO "+globalStrings.expenseTableName+ " (date,datestring,type,cat,amount,desc) VALUES (?,?,?,?,?,?)";

  //Tables Records Updation
  public static membersUpdate ="UPDATE  "+globalStrings.membersTableName+ "  SET date = (?), name = (?),gender = (?) ,dob = (?), aadhar = (?),mobile = (?),email = (?) ,passport = (?), ration = (?),pan = (?) WHERE id = (?)"
  public static financeUpdate ="UPDATE "+globalStrings.financeTableName+ " SET date = (?), name = (?), amount = (?), intrest = (?),mobile = (?), village = (?), desc = (?), total = (?) WHERE id = (?)"
  public static banksUpdate ="UPDATE "+globalStrings.bankTableName+ " SET date = (?), name = (?),number = (?) ,ifsc = (?), branch = (?) WHERE id = (?)"
  public static expenseUpdate ="UPDATE "+globalStrings.expenseTableName+ " SET  type = (?),cat = (?) ,amount = (?), desc = (?) WHERE id = (?)"
  
 //Json paths
 public static CategoriesJsonPath = 'assets/json/categories.json' 


   


}