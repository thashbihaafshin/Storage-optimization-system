import os
import zipfile
from datetime import datetime
from pathlib import Path

def delete_files(file_paths):
    """Permanently deletes a list of files from the disk."""
    deleted = []
    errors = []
    for path in file_paths:
        try:
            if os.path.exists(path):
                os.remove(path)
                deleted.append(path)
        except Exception as e:
            errors.append({"path": path, "error": str(e)})
            
    return {"deleted": deleted, "errors": errors}

def archive_files(file_paths, target_folder):
    """Compresses a list of files into a single ZIP archive."""
    if not file_paths:
        return {"archive_path": None, "archived": [], "errors": ["No files provided."]}
    
    # Create a unique zip filename based on the current time
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    archive_name = f"Inactive_Archive_{timestamp}.zip"
    archive_path = Path(target_folder) / archive_name
    
    archived = []
    errors = []
    
    try:
        with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for path in file_paths:
                try:
                    file_path = Path(path)
                    if file_path.exists():
                        # arcname=file_path.name ensures we don't recreate the whole C:\ folder structure inside the zip
                        zipf.write(file_path, arcname=file_path.name)
                        archived.append(path)
                    else:
                        errors.append({"path": path, "error": "File not found."})
                except Exception as e:
                    errors.append({"path": path, "error": str(e)})
    except Exception as e:
        return {"archive_path": None, "archived": [], "errors": [str(e)]}
        
    return {"archive_path": str(archive_path), "archived": archived, "errors": errors}