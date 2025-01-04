use std::fs::File;
use std::io::{self, Write};
use std::path::Path;

fn save_content_to_file(content: &str, path: &Path) -> io::Result<()> {
    // 修改文件内容
    // 以写模式打开文件
    let mut file = File::create(path)?;

    // 写入新的内容
    file.write_all(content.as_bytes())?;
    Ok(())
}

#[tauri::command]
pub fn set_hosts_content(content: &str) -> Result<(), String> {
    let path = Path::new("/etc/hosts");

    save_content_to_file(content, path).map_err(|err| err.to_string())?;
    Ok(())
}
