use tauri::{Builder, Wry};

mod commands;

pub fn setup(builder: Builder<Wry>) -> Builder<Wry> {
    builder.invoke_handler(tauri::generate_handler![commands::set_hosts_content])
}
