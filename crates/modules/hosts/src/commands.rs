use knives_shared::{ResponseCode, ResponseResult};
use std::{
    fs::OpenOptions,
    io::{self, Write},
};

/// 定义 hosts 文件路径常量
#[cfg(target_os = "windows")]
const HOSTS_PATH: &str = "C:\\Windows\\System32\\drivers\\etc\\hosts";

#[cfg(not(target_os = "windows"))]
const HOSTS_PATH: &str = "/etc/hosts";

#[tauri::command]
pub fn set_hosts_content(content: &str) -> Result<ResponseResult, ResponseResult> {
    let open_result = OpenOptions::new().write(true).open(HOSTS_PATH);
    let mut host_file = match open_result {
        Ok(file) => file,
        Err(err) => match err.kind() {
            io::ErrorKind::NotFound => {
                return Err(ResponseResult {
                    code: ResponseCode::FileNotFound,
                    message: "file does not exist.".to_string(),
                });
            }
            io::ErrorKind::PermissionDenied => {
                return Err(ResponseResult {
                    code: ResponseCode::PermissionDenied,
                    message: "permission denied.".to_string(),
                });
            }
            _ => {
                return Err(ResponseResult {
                    code: ResponseCode::UnknownError,
                    message: "unknown error.".to_string(),
                });
            }
        },
    };

    // Write content to the file
    if let Err(err) = host_file.write_all(content.as_bytes()) {
        match err.kind() {
            io::ErrorKind::PermissionDenied => {
                return Err(ResponseResult {
                    code: ResponseCode::PermissionDenied,
                    message: "permission denied.".to_string(),
                });
            }
            _ => {
                return Err(ResponseResult {
                    code: ResponseCode::UnknownError,
                    message: "unknown error.".to_string(),
                });
            }
        }
    }

    Ok(ResponseResult {
        code: ResponseCode::Success,
        message: "success".to_string(),
    })
}
