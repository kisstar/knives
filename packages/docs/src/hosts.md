# Hosts

Hosts 文件编辑器提供了编辑 Hosts 文件的便捷方式，可以方便的添加、删除和修改其中的内容。

## 使用说明

在基于 Tauri 的应用中向 `/etc/hosts` 文件写入内容通常需要较高的权限，因为这是一个系统级的配置文件。

虽然不推荐直接修改系统文件的权限，但为了使用方便可以暂时修改 `/etc/hosts` 文件的权限，使其可写：

```bash
sudo chmod a+w /etc/hosts
```

如果不再需要时，再恢复其原始权限：

```bash
sudo chmod a-w /etc/hosts
```

## 开发说明

除了直接修改 `/etc/hosts` 文件的权限外，还可以使用 sudo 提权：

- 将需要设置的最新内容写入临时文件；
- 使用 sudo 命令将临时文件的内容更新到 `/etc/hosts` 文件；

```rust
use std::process::Command;

fn main() {
    let output = Command::new("sudo")
        .arg("mv")
        .arg("path/to/tmp_hosts")
        .arg("/etc/hosts")
        .output()
        .expect("Failed to execute command");

    if output.status.success() {
        println!("Hosts file updated successfully");
    } else {
        println!("Failed to update hosts file");
    }
}
```
