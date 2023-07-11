package br.com.comunicacaomicrosservicos.productapi.modules.category.dto;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;

@Data
public class CategoryRequest {

    private String description;
}
