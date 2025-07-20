The admin dashboard would be a web-based platform offering a comprehensive suite of tools for estate management.
Admin Dashboard Features:
 Estate Management: Admins can register new estates, configure settings for each estate, and view estate-level analytics.
 User Management: Admins can manage residents and security personnel.
 Data Monitoring: View statistics across all residents, such as the total number of residents, security
personnel, visitors, and incidents.
 Home Service Management: Admins can register artisans for residents to book their services.
 Payment (Subscription); The admin can track the total number of residents who have subscribed
and the corresponding payment amount.
 Information Dissemination: Admins can send information or emergency alerts to all residents or
specific members of the estate.

 Incident/Report Management: Admins can view all reports (such as incidents, security logs, etc.) from the estate.
3. CENTRALIZED DATABASE DASHBOARD (WEB-BASED) TO BE MANAGED BY APP OWNER (VAULTIFY CEO):
This dashboard allows the app owner (Vaultify CEO) to track global data across all estates, including:
 Total number of estates
 Total number of residents and security personnel
 The App Manager can disseminate information to all users (residents and security personnel)
through general push notifications.
How It Works:
The centralized database stores aggregated data for all estates, including:
 Total Number of Estates: Tracks how many estates are registered in the system.
 Global Resident Count: Represents the aggregate number of residents across all estates.
Central Database Structure:
 Estates Table: Stores information about all registered estates.
 estate_id: Unique identifier for the estate.
 name: Name of the estate.
 location: Physical address of the estate.
 Total_residents: Aggregate number of residents for all estates.
 Total_estates: Number of estates registered in the system.
This dashboard can be hosted separately and accessed by the admin or higher-level management to monitor overall performance and global statistics.
CONCLUSION: HOW THESE SYSTEMS INTERACT: 1. Mobile App (Security and Residents):
 Each estate has its own separate database, and the mobile app accesses data specific to the estate the user belongs to.
 Security and resident data (e.g., visitor logs, alerts) are stored in individual estate databases. The app fetches this data when the user logs in and interacts with the system.
2. WebAdminDashboard:
 Admin users log into a web dashboard connected to a centralized database.

 The centralized database stores aggregated data for all estates, and the admin dashboard pulls this data for reporting purposes (e.g., total number of residents across all estates).
 The admin dashboard can also interact with individual estate databases to manage users and view estate-specific data.
 When an admin wants to view detailed data from a particular estate (e.g., specific resident logs, visitor entries), the dashboard makes an API call to the relevant estate’s database

https://vaultify-omega.vercel.app# vaultify-admin-dashboard
# vaultify-admin-dashboard
# vaultify-admin-dashboard
