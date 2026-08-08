/// Copyright 2026 Gerard Valls Montaño
/// Licensed under the Apache License, Version 2.0

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running OpenArtTools");
}
