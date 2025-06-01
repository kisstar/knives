use serde::{Deserialize, Serialize, Serializer};

#[derive(Deserialize, Clone, Copy, Debug)]
pub enum ResponseCode {
    Success = 656,
    FileNotFound,
    PermissionDenied,
    UnknownError,
}

impl Serialize for ResponseCode {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_i32(*self as i32)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ResponseResult {
    pub code: ResponseCode,
    pub message: String,
}
