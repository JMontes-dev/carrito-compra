<?php
// API local: su única función es devolver los productos JSON.
header('Content-Type: application/json; charset=utf-8');
?>
{
    "moneda": "€",
    "productos": [
        {
            "SKU": "PS5GTA6STDGL",
            "nombre": "Grand Theft Auto IV",
            "precio": "99.99"
        },
        {
            "SKU": "PS5SPD2STDUS",
            "nombre": "Marvel's Spider-Man 2",
            "precio": "79.99"
        },
        {
            "SKU": "PS5GOWLSTDGL",
            "nombre": "God of War Laufey",
            "precio": "79.99"
        },
        {
            "SKU": "PCJEDISTDGL",
            "nombre": "Star Wars Jedi Survivor",
            "precio": "59.99"
        }
    ]
}