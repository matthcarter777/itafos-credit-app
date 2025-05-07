'use client'

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '../Input/Input';
import { useState } from 'react'
import { Toast } from '../Toast/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Select from '../Select/Select';
import { createAtividadeFazendaCliente } from '@/app/services/create/CreateAtividadeFazendaCliente';
import toast from 'react-hot-toast';


type CreateAtividadeClienteModalProps = {
  title: string;
  fazendaId: string;
}

const createAtividadeClienteSchema = z.object({
  nome: z.string().nonempty('A atividade deve ser selecionada.'),
  tipoCultivo: z.string().nonempty('O tipo de cultivo deve ser selecionado.'),
  areaPlantada: z.string().nullable().optional(),
  quantHectares: z.string().nullable().optional(),
  irrigada: z.string().nullable().optional(),
  suplemento: z.string().nullable().optional(),
  nivelTecnologico: z.string().nullable().optional(),
  quantAnimais: z.string().nullable().optional(),
  confinamento: z.string().nullable().optional(),
  areaTerra: z.string().nullable().optional(),
  leite: z.string().nullable().optional(),
  corte: z.string().nullable().optional(),
}).superRefine((data, ctx) => {
  // Validações baseadas no campo "nome"
  const nomesQuePrecisamDeArea = [
    'Culturas Verão',
    'Culturas de 2ª e 3ª Safra',
    'Culturas Perenes',
    'Hortifruti e Outros',
  ];

  if (nomesQuePrecisamDeArea.includes(data.nome)) {
    if (!data.areaPlantada || data.areaPlantada.trim() === '') {
      ctx.addIssue({
        path: ['areaPlantada'],
        message: `A área plantada é obrigatória para ${data.nome}.`,
        code: z.ZodIssueCode.custom,
      });
    }
  }

  // Validações baseadas no tipoCultivo
  if (data.tipoCultivo === 'Pecuária de Confinamento') {
    if (!data.quantAnimais || data.quantAnimais.trim() === '') {
      ctx.addIssue({
        path: ['quantAnimais'],
        message: 'A quantidade de animais é obrigatória para Pecuária.',
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.confinamento || data.confinamento.trim() === '') {
      ctx.addIssue({
        path: ['confinamento'],
        message: 'O confinamento é obrigatório para Pecuária.',
        code: z.ZodIssueCode.custom,
      });
    }
  }

  if (data.tipoCultivo === 'Pecuária de Leite') {
    if (!data.leite || data.leite.trim() === '') {
      ctx.addIssue({
        path: ['leite'],
        message: 'A quantidade de leite é obrigatória para Pecuária de leite.',
        code: z.ZodIssueCode.custom,
      });
    }

    if (!data.areaTerra || data.areaTerra.trim() === '') {
      ctx.addIssue({
        path: ['areaTerra'],
        message: 'A área de terra é obrigatória para Pecuária de leite.',
        code: z.ZodIssueCode.custom,
      });
    }
  }

  if (data.tipoCultivo === 'Pecuária de Corte') {
    if (!data.corte || data.corte.trim() === '') {
      ctx.addIssue({
        path: ['corte'],
        message: 'A quantidade de corte é obrigatória para Pecuária de Corte.',
        code: z.ZodIssueCode.custom,
      });
    }
  }
});

type CreateAtividadeClienteSchema = z.infer<typeof createAtividadeClienteSchema>;
export default function CreateAtividadeClienteModal({ title, fazendaId }: CreateAtividadeClienteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAtividadeFazendaCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      setShowToast(true);
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao criar RTV:', error);
    },
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateAtividadeClienteSchema>({
    resolver: zodResolver(createAtividadeClienteSchema),
  });

  
  const estadoAtividadeOptions = [
    {id: "Culturas Verão", nome: "Culturas Verão"},
    {id: "Culturas de 2ª e 3ª Safra", nome: "Culturas de 2ª e 3ª Safra"},
    {id: "Culturas Perenes", nome: "Culturas Perenes"},
    {id: "Hortifruti e Outros", nome: "Hortifruti e Outros"},
    {id: "Pecuária", nome: "Pecuária"},
  ]
  
  const culturaVeraoOptions = [
    { id: "Algodão", nome: "Algodão" },
    { id: "Amedoim", nome: "Amedoim" },
    { id: "Arroz", nome: "Arroz" },
    { id: "Arveja Colombia", nome: "Arveja Colombia" },
    { id: "Avena Colombia", nome: "Avena Colombia" },
    { id: "Cebada Colombia", nome: "Cebada Colombia" },
    { id: "Feijão", nome: "Feijão" },
    { id: "Girasol Colombia", nome: "Girasol Colombia" },
    { id: "Habichuela Colombia", nome: "Habichuela Colombia" },
    { id: "Maiz Colombia", nome: "Maiz Colombia" },
    { id: "Maiz Forrajero Colombia", nome: "Maiz Forrajero Colombia" },
    { id: "Malanga Colombia", nome: "Malanga Colombia" },
    { id: "Milho Silagem 1ª Safra", nome: "Milho Silagem 1ª Safra" },
    { id: "Milho", nome: "Milho" },
    { id: "Soja", nome: "Soja" },
    { id: "Tabaco Negro Colombia", nome: "Tabaco Negro Colombia" },
    { id: "Tabaco Rubio Colombia", nome: "Tabaco Rubio Colombia" },
    { id: "Trigo", nome: "Trigo" },
  ];
  
  const culturaSafraOptions = [
    { id: "Algodão Adensado", nome: "Algodão Adensado" },
    { id: "Algodão Safrinha", nome: "Algodão Safrinha" },
    { id: "Arroz 2ª Safra", nome: "Arroz 2ª Safra" },
    { id: "Aveia Branca", nome: "Aveia Branca" },
    { id: "Azevém", nome: "Azevém" },
    { id: "Cana-de-Açúcar Safrinha", nome: "Cana-de-Açúcar Safrinha" },
    { id: "Canola", nome: "Canola" },
    { id: "Feijão 2ª Safra", nome: "Feijão 2ª Safra" },
    { id: "Feijão 3ª Safra", nome: "Feijão 3ª Safra" },
    { id: "Feijão Caupi", nome: "Feijão Caupi" },
    { id: "Feijão Irrigado 2ª Safra", nome: "Feijão Irrigado 2ª Safra" },
    { id: "Feijão Irrigado 3ª Safra", nome: "Feijão Irrigado 3ª Safra" },
    { id: "Gergelim", nome: "Gergelim" },
    { id: "Girassol", nome: "Girassol" },
    { id: "Milheto", nome: "Milheto" },
    { id: "Milho Doce", nome: "Milho Doce" },
    { id: "Milho Pipoca", nome: "Milho Pipoca" },
    { id: "Milho Safrinha", nome: "Milho Safrinha" },
    { id: "Milho Safrinha 1º Ano", nome: "Milho Safrinha 1º Ano" },
    { id: "Milho Safrinha Irrigado", nome: "Milho Safrinha Irrigado" },
    { id: "Milho Silagem 2ª Safra", nome: "Milho Silagem 2ª Safra" },
    { id: "Semente de Milho", nome: "Semente de Milho" },
    { id: "Semente de Soja 2ª Safra", nome: "Semente de Soja 2ª Safra" },
    { id: "Soja Safrinha", nome: "Soja Safrinha" },
    { id: "Sorgo", nome: "Sorgo" },
    { id: "Soya Zafriña PY", nome: "Soya Zafriña PY" },
    { id: "Trigo", nome: "Trigo" },
  ];

  const culturasPerenesOptions = [
    { id: "Agraz Colombia", nome: "Agraz Colombia" },
    { id: "Aguacate Colombia", nome: "Aguacate Colombia" },
    { id: "Andinos Colombia", nome: "Andinos Colombia" },
    { id: "Asai Colombia", nome: "Asai Colombia" },
    { id: "Bananito Colombia", nome: "Bananito Colombia" },
    { id: "Borojo Colombia", nome: "Borojo Colombia" },
    { id: "Cacao Colombia", nome: "Cacao Colombia" },
    { id: "Café Arábica Irrigado", nome: "Café Arábica Irrigado" },
    { id: "Cafe Arábica Manual", nome: "Cafe Arábica Manual" },
    { id: "Café Arábica Mecanizada", nome: "Café Arábica Mecanizada" },
    { id: "Cafe Colombia", nome: "Cafe Colombia" },
    { id: "Café Esqueletado", nome: "Café Esqueletado" },
    { id: "Cafe Implantação", nome: "Cafe Implantação" },
    { id: "Café Recepa", nome: "Café Recepa" },
    { id: "Café Robusta", nome: "Café Robusta" },
    { id: "Café Safra Cheia (pós esquelet)", nome: "Café Safra Cheia (pós esquelet)" },
    { id: "Caña Azucar", nome: "Caña Azucar" },
    { id: "Cana Implantação", nome: "Cana Implantação" },
    { id: "Caña Miel Colombia", nome: "Caña Miel Colombia" },
    { id: "Caña Panelera Colombia", nome: "Caña Panelera Colombia" },
    { id: "Cana-de-açúcar", nome: "Cana-de-açúcar" },
    { id: "Caucho Colombia", nome: "Caucho Colombia" },
    { id: "Chontaduro Colombia", nome: "Chontaduro Colombia" },
    { id: "Citricos Colombia", nome: "Citricos Colombia" },
    { id: "Coco", nome: "Coco" },
    { id: "Coco Colombia", nome: "Coco Colombia" },
    { id: "Curuba Colombia", nome: "Curuba Colombia" },
    { id: "Dendê", nome: "Dendê" },
    { id: "Durazno Colombia", nome: "Durazno Colombia" },
    { id: "Guayaba Colombia", nome: "Guayaba Colombia" },
    { id: "Laranja Indústria", nome: "Laranja Indústria" },
    { id: "Laranja Mesa", nome: "Laranja Mesa" },
    { id: "Limão", nome: "Limão" },
    { id: "Limão (1 a 2 anos)", nome: "Limão (1 a 2 anos)" },
    { id: "Limão (2 a 3 anos)", nome: "Limão (2 a 3 anos)" },
    { id: "Limão (3 a 8 anos)", nome: "Limão (3 a 8 anos)" },
    { id: "Limão (8 a 12 anos)", nome: "Limão (8 a 12 anos)" },
    { id: "Limão Implantação (0 a 1 ano)", nome: "Limão Implantação (0 a 1 ano)" },
    { id: "Limon Colombia", nome: "Limon Colombia" },
    { id: "Mango Colombia", nome: "Mango Colombia" },
    { id: "Maranon Colombia", nome: "Maranon Colombia" },
    { id: "Mora Colombia", nome: "Mora Colombia" },
    { id: "Naranja Colombia", nome: "Naranja Colombia" },
    { id: "Palma Colombia", nome: "Palma Colombia" },
    { id: "Papaya Colombia", nome: "Papaya Colombia" },
    { id: "Pera Colombia", nome: "Pera Colombia" },
    { id: "Plántano Colombia", nome: "Plántano Colombia" },
    { id: "Uva Colombia", nome: "Uva Colombia" },
  ];
  
  const hortifrutiEOutrosOptions = [
    { id: "Abacate", nome: "Abacate" },
    { id: "Abacaxi", nome: "Abacaxi" },
    { id: "Abóbora", nome: "Abóbora" },
    { id: "Abobrinha", nome: "Abobrinha" },
    { id: "Abobrinha Tecnificada", nome: "Abobrinha Tecnificada" },
    { id: "Acelga", nome: "Acelga" },
    { id: "Acerola", nome: "Acerola" },
    { id: "Achira Colombia", nome: "Achira Colombia" },
    { id: "Adiantamento", nome: "Adiantamento" },
    { id: "Agrião", nome: "Agrião" },
    { id: "Agrião Hidropônico", nome: "Agrião Hidropônico" },
    { id: "Alcachofra", nome: "Alcachofra" },
    { id: "Alface", nome: "Alface" },
    { id: "Alface Hidropônica", nome: "Alface Hidropônica" },
    { id: "Alfafa/Tifton", nome: "Alfafa/Tifton" },
    { id: "Alho", nome: "Alho" },
    { id: "Alho Poró", nome: "Alho Poró" },
    { id: "Almeirão", nome: "Almeirão" },
    { id: "Ameixa", nome: "Ameixa" },
    { id: "Aspargo", nome: "Aspargo" },
    { id: "Atemoia", nome: "Atemoia" },
    { id: "Aveia Preta", nome: "Aveia Preta" },
    { id: "Azeitona", nome: "Azeitona" },
    { id: "Banana", nome: "Banana" },
    { id: "Batata", nome: "Batata" },
    { id: "Batata Doce", nome: "Batata Doce" },
    { id: "Berinjela", nome: "Berinjela" },
    { id: "Beterraba", nome: "Beterraba" },
    { id: "Brócolis", nome: "Brócolis" },
    { id: "Cacau", nome: "Cacau" },
    { id: "Caju", nome: "Caju" },
    { id: "Caqui", nome: "Caqui" },
    { id: "Cara", nome: "Cara" },
    { id: "Carambola", nome: "Carambola" },
    { id: "Cebola", nome: "Cebola" },
    { id: "Cebola de Bulbo", nome: "Cebola de Bulbo" },
    { id: "Cebolinha", nome: "Cebolinha" },
    { id: "Cebolla de Rama Colombia", nome: "Cebolla de Rama Colombia" },
    { id: "Cedro", nome: "Cedro" },
    { id: "Cenoura", nome: "Cenoura" },
    { id: "Centeio", nome: "Centeio" },
    { id: "Cevada", nome: "Cevada" },
    { id: "Chá", nome: "Chá" },
    { id: "Chicoria", nome: "Chicoria" },
    { id: "Chuchu", nome: "Chuchu" },
    { id: "Cidra", nome: "Cidra" },
    { id: "Coentro", nome: "Coentro" },
    { id: "Couve", nome: "Couve" },
    { id: "Couve-flor", nome: "Couve-flor" },
    { id: "Crotalaria", nome: "Crotalaria" },
    { id: "Erva Mate", nome: "Erva Mate" },
    { id: "Ervilha", nome: "Ervilha" },
    { id: "Espinaca Colombia", nome: "Espinaca Colombia" },
    { id: "Espinafre", nome: "Espinafre" },
    { id: "Eucalipto", nome: "Eucalipto" },
    { id: "Eucalipto Lenha/Carvão", nome: "Eucalipto Lenha/Carvão" },
    { id: "Fava", nome: "Fava" },
    { id: "Figo", nome: "Figo" },
    { id: "Flores", nome: "Flores" },
    { id: "Flores Colombia", nome: "Flores Colombia" },
    { id: "Frutas - Colômbia", nome: "Frutas - Colômbia" },
    { id: "Fumo", nome: "Fumo" },
    { id: "Global", nome: "Global" },
    { id: "Goiaba", nome: "Goiaba" },
    { id: "Grama", nome: "Grama" },
    { id: "Guaraná", nome: "Guaraná" },
    { id: "Hortalizas Colombia", nome: "Hortalizas Colombia" },
    { id: "Hortensia Colombia", nome: "Hortensia Colombia" },
    { id: "ortifruti", nome: "ortifruti" },
    { id: "Inhame", nome: "Inhame" },
    { id: "Jaboticaba", nome: "Jaboticaba" },
    { id: "Jaca", nome: "Jaca" },
    { id: "Jiló", nome: "Jiló" },
    { id: "Juta", nome: "Juta" },
    { id: "Látex", nome: "Látex" },
    { id: "Lechuga Colombia", nome: "Lechuga Colombia" },
    { id: "Lichia", nome: "Lichia" },
    { id: "Lima", nome: "Lima" },
    { id: "Limão", nome: "Limão" },
    { id: "Laranja", nome: "Laranja" },
    { id: "Linho", nome: "Linho" },
    { id: "Lulo Colombia", nome: "Lulo Colombia" },
    { id: "Maçã", nome: "Maçã" },
    { id: "Macadamia", nome: "Macadamia" },
    { id: "Malva", nome: "Malva" },
    { id: "Mamão", nome: "Mamão" },
    { id: "Mamona", nome: "Mamona" },
    { id: "Mandioca", nome: "Mandioca" },
    { id: "Mandioca 2° Safra", nome: "Mandioca 2° Safra" },
    { id: "Mandioquinha", nome: "Mandioquinha" },
    { id: "Manga", nome: "Manga" },
    { id: "Mangustão", nome: "Mangustão" },
    { id: "Maracujá", nome: "Maracujá" },
    { id: "Marmelo", nome: "Marmelo" },
    { id: "Maxixe", nome: "Maxixe" },
    { id: "Melancia", nome: "Melancia" },
    { id: "Melancia 2° Safra", nome: "Melancia 2° Safra" },
    { id: "Melão", nome: "Melão" },
    { id: "Mogno", nome: "Mogno" },
    { id: "Morango", nome: "Morango" },
    { id: "Morango Estufa", nome: "Morango Estufa" },
    { id: "Mostarda", nome: "Mostarda" },
    { id: "Mudas", nome: "Mudas" },
    { id: "Nabo", nome: "Nabo" },
    { id: "Noz", nome: "Noz" },
    { id: "Olerícolas e Folhosas", nome: "Olerícolas e Folhosas" },
    { id: "Oliveira", nome: "Oliveira" },
    { id: "Outros", nome: "Outros" },
    { id: "Painço", nome: "Painço" },
    { id: "Palmito", nome: "Palmito" },
    { id: "Pastagem Brachiaria", nome: "Pastagem Brachiaria" },
    { id: "Pasturas Colombia", nome: "Pasturas Colombia" },
    { id: "Pepino", nome: "Pepino" },
    { id: "Pêra", nome: "Pêra" },
    { id: "Pêssego", nome: "Pêssego" },
    { id: "Piaçava", nome: "Piaçava" },
    { id: "Pimenta", nome: "Pimenta" },
    { id: "Pimenta do Reino", nome: "Pimenta do Reino" },
    { id: "Pimentão", nome: "Pimentão" },
    { id: "Pinha", nome: "Pinha" },
    { id: "Pinus", nome: "Pinus" },
    { id: "Plantas Medicinales Colombia", nome: "Plantas Medicinales Colombia" },
    { id: "Quiabo", nome: "Quiabo" },
    { id: "Rabanete", nome: "Rabanete" },
    { id: "Rami", nome: "Rami" },
    { id: "Repolho", nome: "Repolho" },
    { id: "Roma", nome: "Roma" },
    { id: "Rosa Colombia", nome: "Rosa Colombia" },
    { id: "Rosas", nome: "Rosas" },
    { id: "Rucula", nome: "Rucula" },
    { id: "Rúcula Hidropônica", nome: "Rúcula Hidropônica" },
    { id: "Salsa", nome: "Salsa" },
    { id: "Semente de Capim", nome: "Semente de Capim" },
    { id: "Seringueira", nome: "Seringueira" },
    { id: "Sidra", nome: "Sidra" },
    { id: "Sisal", nome: "Sisal" },
    { id: "Stevia", nome: "Stevia" },
    { id: "Tangerina", nome: "Tangerina" },
    { id: "Tomate", nome: "Tomate" },
    { id: "Tomate Colombia", nome: "Tomate Colombia" },
    { id: "Tomate de Arbol Colombia", nome: "Tomate de Arbol Colombia" },
    { id: "Tomate Mesa", nome: "Tomate Mesa" },
    { id: "Triticale", nome: "Triticale" },
    { id: "Tungue", nome: "Tungue" },
    { id: "Urucum", nome: "Urucum" },
    { id: "Uva", nome: "Uva" },
    { id: "Vagem", nome: "Vagem" },
  ];
  
  const pecuariaOptions = [
    { id: "Pecuária de Confinamento", nome: "Pecuária de Confinamento" },
    { id: "Pecuária de Leite", nome: "Pecuária de Leite" },
    { id: "Pecuária de Corte", nome: "Pecuária de Corte" },
  ];

  const simNaoOptions = [
    {id: "true", nome: "Sim"},
    {id: "False", nome: "Não"},
  ]
  
  const nivelTecOptions = [
    {id: "Alto", nome: "Alto"},
    {id: "Médio", nome: "Médio"},
    {id: "Baixo", nome: "Baixo"},
  ]
  
  

  const handleFormSubmit = async (data: CreateAtividadeClienteSchema) => {
    setIsOpen(false); 

    await mutation.mutateAsync({
      fazendaId,
      nome: data.nome,
      tipoCultivo: data.tipoCultivo,
      areaPlantada: Number(data.areaPlantada) ?? undefined,
      irrigada: Boolean(data.irrigada) ?? undefined,
      suplemento: Boolean(data.suplemento) ?? undefined,
      nivelTecnologico: data.nivelTecnologico ?? undefined,
      quantAnimais: Number(data.quantAnimais) ?? undefined,
      confinamento: data.confinamento ?? undefined,
      areaTerra: Number(data.areaPlantada) ?? undefined,
      leite: Number(data.leite) ?? undefined,
      corte: Number(data.corte) ?? undefined,
    });

    toast.success('Atividade criada com sucesso.');
  };

  const dataMap = {
    "Culturas Verão": culturaVeraoOptions,
    "Culturas de 2ª e 3ª Safra": culturaSafraOptions,
    "Culturas Perenes": culturasPerenesOptions,
    "Hortifruti e Outros": hortifrutiEOutrosOptions,
    "Pecuária": pecuariaOptions,
  } as const;
  
  type TipoAtividade = keyof typeof dataMap;
  
  const tipoAtividade = watch("nome") as TipoAtividade;
  
  const dataativ = dataMap[tipoAtividade] || []; 
  
  const tipoAtividadePecuaria = watch("nome");
  const isPecuaria = tipoAtividadePecuaria === "Pecuária";

  const tipoPecuaria = watch("tipoCultivo");

  const isCorte = tipoPecuaria === "Pecuária de Corte";
  const isLeite = tipoPecuaria === "Pecuária de Leite";
  const isConfinamento = tipoPecuaria === "Pecuária de Confinamento";

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="
        bg-emerald-700 
        text-stone-50 
        rounded-sm 
        h-10 
        font-bold 
        hover:bg-emerald-800 
        transition-colors
        p-3
        flex
        items-center
        justify-center
      " 
      >
        { title }
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form 
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-md flex flex-col gap-3" 
            onSubmit={handleSubmit(handleFormSubmit)} >
            <h2 className="text-xl font-bold mb-4">{title}</h2>
              <Select<CreateAtividadeClienteSchema>
              label="Qual é a Atividade?"
              name="nome"
              register={register}
              errors={errors}
              options={estadoAtividadeOptions || []}
            />
            <Select<CreateAtividadeClienteSchema>
              label={tipoAtividade === 'Pecuária' ? 'Tipo de Pecuária' : 'Tipo de Cultivo'}
              name="tipoCultivo"
              register={register}
              errors={errors}
              options={dataativ || []}
            />

            {isPecuaria && (
              <>

                {!isConfinamento && (
                  <Input<CreateAtividadeClienteSchema>
                    label="Área Terra (há)"
                    name="quantHectares"
                    register={register}
                    errors={errors}
                    placeholder="Informe a área total da terra em hectares"
                  />
                )}

                {isConfinamento && (
                  <>
                    <Input<CreateAtividadeClienteSchema>
                      label="Qtde Animais"
                      type="number"
                      name="quantAnimais"
                      register={register}
                      errors={errors}
                      placeholder="Informe a quantidade total de animais"
                    />
                    <Input<CreateAtividadeClienteSchema>
                      label="Confinamento"
                      type="number"
                      name="confinamento"
                      register={register}
                      errors={errors}
                      placeholder="Informe a capacidade de confinamento"
                    />
                  </>
                )}

                {isCorte && (
                  <Input<CreateAtividadeClienteSchema>
                    label="Corte"
                    type="number"
                    name="corte"
                    register={register}
                    errors={errors}
                    placeholder="Informe a quantidade destinada ao corte"
                  />
                )}

                {isLeite && (
                  <Input<CreateAtividadeClienteSchema>
                    label="Leite"
                    type="number"
                    name="leite"
                    register={register}
                    errors={errors}
                    placeholder="Informe a produção média de leite"
                  />
                )}
              </>
            )}
            {!isPecuaria && (
              <>
                <Input<CreateAtividadeClienteSchema>
                  label="Área Plantada (há)"
                  type="number"
                  name="areaPlantada"
                  register={register}
                  errors={errors}
                  placeholder="Informe a área total plantada em hectares"
                />
                <Select<CreateAtividadeClienteSchema>
                  label="A plantação é irrigada?"
                  name="irrigada"
                  register={register}
                  errors={errors}
                  options={simNaoOptions || []}
                />
              </>
            )}

            <Select<CreateAtividadeClienteSchema>
              label="Usa algum tipo de suplemento?"
              name="suplemento"
              register={register}
              errors={errors}
              options={simNaoOptions || []}
            />
            <Select<CreateAtividadeClienteSchema>
              label="Nível de Tecnologia"
              name="nivelTecnologico"
              register={register}
              errors={errors}
              options={nivelTecOptions || []}
            />

            <button
              className="px-4 py-2 bg-emerald-700  text-white rounded hover:bg-emerald-800 transition"
              type="submit"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Fechar
            </button>
          </form>

          {showToast && (
            <Toast
              message="Usuario salvos com sucesso!"
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
