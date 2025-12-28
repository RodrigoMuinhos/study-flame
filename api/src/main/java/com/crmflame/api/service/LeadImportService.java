package com.crmflame.api.service;

import com.crmflame.api.dto.ImportResultDTO;
import com.crmflame.api.dto.LeadImportDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadImportService {

    private final LeadRepository leadRepository;

    @Transactional
    public ImportResultDTO importLeads(List<LeadImportDTO> leads) {
        ImportResultDTO result = new ImportResultDTO();
        result.setTotalProcessed(leads.size());
        result.setSuccessCount(0);
        result.setErrorCount(0);
        result.setErrors(new ArrayList<>());

        for (LeadImportDTO dto : leads) {
            try {
                // Verificar se já existe (por email ou CPF)
                if (leadRepository.existsByEmail(dto.getEmail()) || leadRepository.existsByCpf(dto.getCpf())) {
                    result.getErrors().add("Lead com email ou CPF já existe: " + dto.getEmail());
                    result.setErrorCount(result.getErrorCount() + 1);
                    continue;
                }

                // Criar nova entidade Lead (ID será gerado automaticamente)
                Lead lead = new Lead();
                // NÃO setamos o ID - deixamos o banco gerar um novo UUID
                lead.setName(dto.getName());
                lead.setEmail(dto.getEmail());
                lead.setPhone(dto.getPhone());
                lead.setCpf(dto.getCpf());
                lead.setExperience(dto.getExperience());
                
                // Salvar (INSERT, não UPDATE)
                leadRepository.save(lead);
                result.setSuccessCount(result.getSuccessCount() + 1);

                log.info("Lead importado com sucesso: {}", dto.getName());
            } catch (Exception e) {
                result.setErrorCount(result.getErrorCount() + 1);
                result.getErrors().add("Erro ao importar " + dto.getName() + ": " + e.getMessage());
                log.error("Erro ao importar lead", e);
            }
        }

        result.setMessage(String.format(
            "Importação concluída: %d sucessos, %d erros de %d registros",
            result.getSuccessCount(),
            result.getErrorCount(),
            result.getTotalProcessed()
        ));

        return result;
    }
}
