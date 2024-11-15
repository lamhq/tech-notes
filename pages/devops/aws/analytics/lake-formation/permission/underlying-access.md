# Underlying Data Access Permissions

These permissions control access to the actual data stored in S3 locations.

They include data access permissions and data location permissions.

Data access permissions:
- grants permissions to read/write data directly to tables stored in S3 locations
- include: `SELECT`, `INSERT`, and `DELETE` permissions
- you can grant Data access permissions in the Lake Formation console at **Data lake permissions** section

Data location permissions:
- grants permissions to read/write data files at specific S3 locations.
- include `DATA_LOCATION_ACCESS` permissions
- you can grant Data location permissions in the Lake Formation console at **Data locations** section
- to grant data location access, you must first register that location with Lake Formation
