"use client";

function TermsAndConditions() {
    return (
        <div className="custom-class w-full">
            <h1 className="text-xl font-semibold my-10">Termos e Condições de Uso - Chegou Sua Encomenda</h1>
            <div className="space-y-10 mb-10 text-gray-800 leading-relaxed text-justify">

                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Identificação das Partes</h2>
                    <p className="font-medium mb-2">Fornecedor:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Razão Social: ARDR Tecnologias LTDA</li>
                        <li>CNPJ: 59.622.675/0001-15</li>
                        <li>Endereço: Rua Carlos Leinig Jr, 354. Vista Alegre. Curitiba - PR. CEP 80820-280.</li>
                        <li>Contato: <a href="mailto:suporte@chegousuaencomenda.com.br" className="text-primary">suporte@chegousuaencomenda.com.br</a> / +55 (41) 98796-4807</li>
                    </ul>
                    <p className="font-medium mt-4 mb-2">Usuário: <p className="inline font-normal">Pessoa física ou jurídica que utiliza o serviço "Chegou Sua Encomenda".</p></p>
                    
                    <hr className="mt-4" />

                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar ou utilizar o serviço "Chegou Sua Encomenda", o Usuário declara ter lido,
                        compreendido e aceitado integralmente os presentes Termos e Condições de Uso.
                        A aceitação destes termos é obrigatória para o uso do serviço. Caso o Usuário não
                        concorde com qualquer disposição aqui contida, deverá abster-se de utilizar o serviço.
                    </p>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Descrição do Serviço</h2>
                    <p>
                        O serviço "Chegou Sua Encomenda", oferecido pelo Fornecedor, consiste em uma solução
                        tecnológica online que permite o envio de avisos de recebimento de encomendas aos
                        moradores de condomínios por meio de mensagens via e-mail e/ou SMS.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4 mb-2">3.1 Funcionalidades do Serviço</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Registro e gerenciamento de encomendas recebidas pelo condomínio.</li>
                        <li>Envio automático de avisos de recebimento de entregas aos moradores cadastrados.</li>
                        <li>Interface simples e intuitiva para facilitar o uso pelos administradores e porteiros.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4 mb-2">3.2 Níveis de Acesso ao Sistema</h3>
                    <p>
                        O sistema "Chegou Sua Encomenda", disponibilizado pelo Fornecedor, oferece dois tipos
                        de acesso, cada um com funcionalidades específicas e restrições de uso:
                    </p>

                    <h4 className="font-medium mt-4 mb-2">a) Acesso de Administração do Sistema</h4>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Disponível para administradores do condomínio ou responsáveis autorizados.</li>
                        <li>Permite o cadastro, edição e exclusão dos dados dos moradores que receberão os avisos de encomendas (e-mails e/ou números de telefone).</li>
                        <li>O acesso de administração é protegido por credenciais exclusivas e deve ser utilizado apenas por pessoas devidamente autorizadas pelo condomínio.</li>
                        <li>Os administradores são responsáveis pela segurança das informações inseridas no sistema e devem garantir que os dados sejam coletados e tratados em conformidade com a Lei Geral de Proteção de Dados (LGPD).</li>
                    </ul>

                    <h4 className="font-medium mt-4 mb-2">b) Acesso de Portaria</h4>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Disponível para porteiros ou outros colaboradores responsáveis pelo recebimento e registro de encomendas.</li>
                        <li>Permite apenas:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Inclusão de novas encomendas no sistema.</li>
                                <li>Destinação das encomendas aos respectivos moradores cadastrados.</li>
                            </ul>
                        </li>
                        <li>Não concede acesso aos dados pessoais dos moradores (como e-mails ou números de telefone), garantindo a privacidade e segurança das informações.</li>
                        <li>O acesso de portaria é limitado e monitorado para evitar uso indevido do sistema.</li>
                    </ul>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Condições de Assinatura</h2>
                    <p>O serviço está disponível mediante assinatura pré-paga ou recorrente, conforme as condições estabelecidas pelo Fornecedor.</p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">4.1 Política de Preços</h3>
                    <p>Os valores aplicáveis ao serviço são determinados com base na quantidade de unidades atendidas (apartamentos ou unidades cadastradas), conforme descrito abaixo:</p>

                    <h4 className="font-medium mt-4 mb-2">4.1.1 Planos Mensais</h4>
                    <p>Para condomínios com até 40 unidades:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Plano Padrão: R$ 67,00 (sessenta e sete reais).</li>
                        <li>Plano Promocional: R$ 57,00 (cinquenta e sete reais).</li>
                    </ul>
                    <p className="mt-2">Para condomínios com mais de 40 unidades, será acrescido um valor adicional conforme a seguinte lógica:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Plano Padrão: R$ 17,50 (dezessete reais e cinquenta centavos) para cada conjunto adicional de 10 unidades.</li>
                        <li>Plano Promocional: R$ 12,00 (doze reais) para cada conjunto adicional de 10 unidades.</li>
                    </ul>
                    <p className="font-medium mt-2">Exemplo de Cálculo:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Condomínio com 50 unidades:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Plano Padrão: R$ 67,00 + R$ 17,50 = R$ 84,50.</li>
                                <li>Plano Promocional: R$ 57,00 + R$ 12,00 = R$ 69,00.</li>
                            </ul>
                        </li>
                    </ul>

                    <h4 className="font-medium mt-4 mb-2">4.1.2 Modelo Recorrente</h4>
                    <p>No modelo recorrente, o Usuário será cobrado automaticamente ao fim de cada período (mensal ou anual), conforme o plano escolhido.</p>
                    <p className="font-medium mt-2">Importante:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Usuário deve cancelar ativamente a assinatura para evitar futuras cobranças.</li>
                        <li>O cancelamento pode ser solicitado a qualquer momento, mas entrará em vigor apenas após o término do período vigente.</li>
                    </ul>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Política de Cancelamento</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Usuário pode solicitar o cancelamento da assinatura a qualquer momento.</li>
                        <li>Assinaturas Pré-Pagas: Não há reembolso após 7 dias de contratação, conforme o Código de Defesa do Consumidor (CDC).</li>
                        <li>Assinaturas Recorrentes: O cancelamento interrompe futuras cobranças.</li>
                    </ul>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">6. Reajuste de Preço</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O preço do serviço poderá ser reajustado:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Modelo Pré-Pago: Para novas adesões e renovações futuras.</li>
                                <li>Modelo Recorrente: Com aviso prévio de 30 dias antes da próxima cobrança.</li>
                            </ul>
                        </li>
                        <li>O reajuste será baseado em critérios de mercado para as assinaturas no modelo Pré-Pago e pelo índice de inflação (IGP-M) no modelo Recorrente a cada 12 meses a partir da assinatura do serviço.</li>
                        <li>O Fornecedor compromete-se a notificar o Usuário sobre qualquer alteração de preços com antecedência de 30 dias por meio do site oficial e/ou outro canal de comunicação registrado.</li>
                    </ul>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">7. Privacidade e Proteção de Dados</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Fornecedor compromete-se a tratar todos os dados pessoais fornecidos pelo Usuário em conformidade com a Lei Geral de Proteção de Dados (LGPD).</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4 mb-2">7.1 Responsabilidade pelo Consentimento dos Moradores</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Usuário (administrador do condomínio) é exclusivamente responsável por:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Obter o consentimento explícito dos moradores antes de inserir seus dados no sistema "Chegou Sua Encomenda".</li>
                                <li>Utilizar o Termo de Consentimento para Envio de Avisos, disponibilizado pelo Fornecedor, ou equivalente, por via física ou digital, para formalizar a autorização dos moradores.</li>
                                <li>Manter os termos de consentimento documentados e acessíveis para comprovação, caso necessário.</li>
                            </ul>
                        </li>
                        <li>O Fornecedor não se responsabiliza por eventuais falhas ou omissões na obtenção do consentimento dos moradores.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4 mb-2">7.2 Uso dos Dados</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Os dados coletados serão utilizados exclusivamente para:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Envio de avisos de recebimento de encomendas via e-mail e/ou SMS.</li>
                                <li>Prestação de suporte técnico e operacional ao Usuário.</li>
                            </ul>
                        </li>
                        <li>O Fornecedor não compartilhará os dados do Usuário com terceiros, exceto quando necessário para cumprir obrigações legais ou determinações judiciais.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4 mb-2">7.3 Exclusão e Retenção de Dados</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Usuário poderá solicitar a exclusão ou correção dos dados pessoais dos moradores a qualquer momento, enviando uma solicitação para o e-mail <a href="mailto:suporte@chegousuaencomenda.com.br" className="text-primary">suporte@chegousuaencomenda.com.br</a>.</li>
                        <li>O Fornecedor processará a solicitação no prazo máximo de 15 dias úteis, conforme determinado pela LGPD.</li>
                        <li>A retenção de dados poderá ocorrer caso seja necessária para cumprir obrigações legais ou regulatórias, mesmo após a solicitação de exclusão.</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4 mb-2">7.4 Disponibilidade do Termo de Consentimento</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>O Fornecedor disponibiliza um modelo de Termo de Consentimento para facilitar a coleta de autorizações dos moradores. Esse documento pode ser acessado e baixado no site oficial do Fornecedor ou solicitado por meio do e-mail <a href="mailto:suporte@chegousuaencomenda.com.br" className="text-primary">suporte@chegousuaencomenda.com.br</a>.</li>
                    </ul>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">8. Suporte ao Usuário</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>E-mail: <a href="mailto:suporte@chegousuaencomenda.com.br" className="text-primary">suporte@chegousuaencomenda.com.br</a></li>
                        <li>Telefone: +55 (41) 98796-4807</li>
                        <li>Horário de atendimento: 08:00 às 18:00 de segunda a sexta-feira.</li>
                    </ul>
                    <p className="mt-2">As solicitações de suporte serão respondidas no prazo máximo de 10 dias úteis, podendo ser solucionadas em prazo menor, exceto em casos de força maior ou eventos fortuitos.</p>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">9. Modificações nos Termos</h2>
                    <p>
                        O Fornecedor reserva-se o direito de modificar estes Termos e Condições a qualquer momento, com aviso prévio aos usuários. As alterações entrarão em vigor após a publicação no site oficial do Fornecedor.
                    </p>
                    <hr className="mt-4" />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">10. Foro e Disposições Gerais</h2>
                    <p>
                        Fica eleito o foro da Comarca de Curitiba - PR para dirimir quaisquer controvérsias relacionadas a estes Termos e Condições, renunciando-se a qualquer outro, por mais privilegiado que seja.
                    </p>
                    <div className="mt-4">
                        <p className="font-medium">Data de Vigência: 19/05/2025</p>
                        <p className="font-medium">Última Atualização: 19/05/2025</p>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default TermsAndConditions;